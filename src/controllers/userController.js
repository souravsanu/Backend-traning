const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel");
const bookModel = require("../models/booksModel")
const { isNotEmpty, isValidName, isValidPhone, isValid, isValidEmail, isValidPass,isstreatValid,isValidPin } = require("../validators/validators")

const createUser = async function (req, res) {
    try {
        const data = req.body;
        
        if (!Object.keys(data).length)
            return res.
                status(400).
                send({ status: false, message: "Please provide some data into the request body!!" });
        if(Object.keys(data).length>6)
            return res.
                status(400).
                    send({status:false,msg:"invalid data entry inside request body"})
                    
        const { title, name, phone, email, password,address } = data;
//*********************************** Title validation *******************************************
        if (!title) 
            return res.
                status(400).
                    send({ status: false, msg: "title is requried" })
        if (!isNotEmpty(title)) 
            return res.
                status(400).
                    send({ status: false, msg: "title is empty" })
        data.title = data.title.trim();
        let arr = ["Mr", "Mrs", "Miss"]
        if (!arr.includes(data.title)) 
            return res.
                status(400).
                    send({ status: false, msg: "use only Mr, Mrs, Miss" })
//****************************** name validation ****************************************
        if (!name)
            return res.
                status(400).
                    send({ status: false, msg: "name is requried" });
        if (!isNotEmpty(name)) 
            return res.
                status(400).
                    send({ status: false, msg: "name field is empty" });
        data.name = data.name.trim()
        if (!isValidName(data.name)) 
            return res.
                status(400).
                    send({ status: false, msg: "name is not valid" })
//*************************************** phone validation ***********************************************
        if (!phone) 
            return res.
                status(400).
                    send({ status: false, msg: "phone is requried" });
        if (!isNotEmpty(phone)) 
             return res.
                 status(400).
                     send({ status: false, msg: "phone field is empty" });
        data.phone = data.phone.trim()
        if (!isValidPhone(data.phone)) 
            return res.
                status(400).
                    send({ status: false, msg: "mobile number is invalid must be of 10 digits" })
        let duplicatePhone = await userModel.findOne({ phone: data.phone });
        if (duplicatePhone)
            return res.
                status(400).
                    send({ status: false, message: "phone is already present" });
    
//**************************Email validation*************************************************
        if (!email) 
            return res.
                status(400).
                    send({ status: false, message: "Email is mandatory" });
        if (!isNotEmpty(email)) 
            return res.
                status(400).
                    send({ status: false, message: "email field is empty" });
        data.email = data.email.trim()
        if (!isValidEmail(email)) 
            return res.
                status(400).
                    send({ status: false, message: "Email is invalid" })
        
        let duplicateEmail = await userModel.findOne({ email: data.email });
        if (duplicateEmail) 
            return res.
                status(400).
                    send({ status: false, message: "Email is already present" });
        
//*********************************** Password Validation *******************************
        if (!password) 
            return res.
                status(400).
                    send({ status: false, msg: "password is requried" })
        
        if (!isNotEmpty(password)) 
            return res.
                status(400).
                    send({ status: false, msg: "password is empty" })
        
        data.password = password.trim()
        if (!isValidPass(data.password)) 
            return res.
                status(400).
                    send({ status: false, msg: "Please enter a valid password" })
        if(address){
            if(Object.keys(address).length==0)
                return res.
                    status(400).
                        send({status:false,msg:"Address must contain something"})
            else{
                const {street,city,pincode}=address
            if(!(isValid(street) || isValid(city) || isValid(pincode))){
                return res.
                    status(400).
                        send({status:false,msg:"We are looking for street ,city or pincode value only inside Address Object"})
            }
            else{
                if(street){
                    if (!isValid(street)) 
                        return res.
                            status(400).
                                send({ status: false, msg: "street field is empty" });
                    if(!isstreatValid(street))
                        return res.
                            status(400).
                                send({status:false,msg:"street is invalid"})
                data.address.street=street.trim()
                }if(city){
                    if (!isNotEmpty(city)) 
                        return res.
                            status(400).
                                send({ status: false, msg: "city field is empty" });
                    if(!isValidName(city))
                        return res.
                            status(400).
                                send({status:false,msg:"city name is not valid"})
                data.address.city=city.trim()
                }if(pincode){
                    if (!isNotEmpty(pincode)) 
                        return res.
                            status(400).
                                send({ status: false, msg: "pincode field is empty" });
                    if(!isValidPin(pincode))
                        return res.
                            status(400).
                                send({status:false,msg:"pincode must contain only digit with 6 length"})
                data.address.pincode=pincode.trim()
                }
            }
            
            }
                
        }
        let createData = await userModel.create(data);
        res.
            status(201).
                send({ status: true,msg:"User Registered Successfully", data: createData });
    } catch (error) {
        res.
            status(500).
                send({ status: false, msg: error.message });
    }
}

const userLogin = async function (req, res) {
    try {
        let requestbody = req.body
        let querybody = req.query

        if (Object.keys(querybody).length > 0)
            return res.
                status(400).
                    send({ status: false, msg: "Invalid request in queryParams" })

        if (Object.keys(requestbody).length == 0)
            return res.
                status(400).
                    send({ status: false, msg: "Data is required in request body" })

        if (Object.keys(requestbody).length > 2)
            return res.
                status(400).
                    send({ status: false, msg: "Invalid request in request body" })

        const { email, password } = requestbody
        if (!email)
            return res.
                status(400).
                    send({ status: false, msg: "Email is required" })

        if (!isValidEmail(email))
            return res.
                status(400).
                    send({ status: false, msg: "Email is invalid" })

        if (!password)
            return res.
                status(400).
                    send({ status: false, msg: "password is required" })

        if (!isValidPass(password))
            return res.
                status(400).
                    send({ status: false, msg: "password is Allowed with lenght 8-15 only" })
        const result = await userModel.findOne({ email: email, password: password })
        if (!result)
            return res.
                status(404).
                    send({ status: false, msg: "User is not Exist" })

// ************************* Token Creation *****************************************************
        
        const token = jwt.sign({ userId: result._id.toString() },
            "booksManagement17", { expiresIn: '5000s' })
        res.header("x-auth-token", token)
        res.
            status(200).
                send({ status: true, message: "Token has created", token: token })
    } catch (error) {
        res.
            status(500).
                send({ status: false, msg: error.message })
    }
}


module.exports = { createUser, userLogin };


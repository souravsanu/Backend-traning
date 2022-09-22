
//================================= Imported all the modules here ======================================
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel");
const bookModel = require("../models/booksModel")
const { isNotEmpty, isValidName, isValidPhone, isValid, isValidEmail, isValidPass,isstreatValid,isValidPin } = require("../validators/validators")

//================================= CREATE USER post/register ======================================
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
                    
        const { title, name, phone, email, password,address } = data;  //destructuring

    // ****************** Title validation ***********************    
        if (!title) 
            return res.
                status(400).
                    send({ status: false, msg: "title is requried" })
        if (!isNotEmpty(title)) 
            return res.
                status(400).
                    send({ status: false, msg: "title is empty" })
        data.title = title.trim();
        let arr = ["Mr", "Mrs", "Miss"]
        if (!arr.includes(data.title)) 
            return res.
                status(400).
                    send({ status: false, msg: "use only Mr, Mrs, Miss" })

// ****************** Name validation ***********************  
        if (!name)
            return res.
                status(400).
                    send({ status: false, msg: "name is requried" });
        if (!isNotEmpty(name)) 
            return res.
                status(400).
                    send({ status: false, msg: "name field is empty" });
        // data.name = data.name.trim()
        if (!isValidName(name)) 
            return res.
                status(400).
                    send({ status: false, msg: "name is not valid" })

// ****************** Phone validation ***********************  
        if (!phone) 
            return res.
                status(400).
                    send({ status: false, msg: "phone is requried" });
        if (typeof phone != "string")
            return res.
                status(400).
                send({ status: false, msg: "please provide phone in string format" })
        if (!isNotEmpty(phone)) 
             return res.
                 status(400).
                     send({ status: false, msg: "phone field is empty" });
        
        if (!isValidPhone(phone)) 
            return res.
                status(400).
                    send({ status: false, msg: "mobile number is invalid must be of 10 digits" })
        let duplicatePhone = await userModel.findOne({ phone: phone });
        if (duplicatePhone)
            return res.
                status(400).
                    send({ status: false, message: "phone is already present" });
    
// ****************** Email validation ***********************  
        if (!email) 
            return res.
                status(400).
                    send({ status: false, message: "Email is mandatory" });
        if (!isNotEmpty(email)) 
            return res.
                status(400).
                    send({ status: false, message: "email field is empty" });
        // data.email = data.email.trim()
        if (!isValidEmail(email)) 
            return res.
                status(400).
                    send({ status: false, message: "Email is invalid" })
        
        let duplicateEmail = await userModel.findOne({ email: email });
        if (duplicateEmail) 
            return res.
                status(400).
                    send({ status: false, message: "Email is already present" });
        
// ****************** Password validation ***********************  
        if (!password) 
            return res.
                status(400).
                    send({ status: false, msg: "password is requried" })
        
        if (!isNotEmpty(password)) 
            return res.
                status(400).
                    send({ status: false, msg: "password is empty" })
        
        // data.password = password.trim()
        if (!isValidPass(password)) 
            return res.
                status(400).
                    send({ status: false, msg: "Please enter a valid password" })

// ****************** Address validation ***********************                      
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
                // data.address.street=street.trim()
                }if(city){
                    if (!isNotEmpty(city)) 
                        return res.
                            status(400).
                                send({ status: false, msg: "city field is empty" });
                    if(!isValidName(city))
                        return res.
                            status(400).
                                send({status:false,msg:"city name is not valid"})
                // data.address.city=city.trim()
                }if(pincode){
                    if (!isNotEmpty(pincode)) 
                        return res.
                            status(400).
                                send({ status: false, msg: "pincode field is empty" });
                    if(!isValidPin(pincode))
                        return res.
                            status(400).
                                send({status:false,msg:"pincode must contain only digit with 6 length"})
                // data.address.pincode=pincode.trim()
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

//================================= User Login post/login ======================================
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

        const { email, password } = requestbody  //destructuring

// ****************** Email validation ***********************          
        if (!email)
            return res.
                status(400).
                    send({ status: false, msg: "Email is required" })

        if (!isValidEmail(email))
            return res.
                status(400).
                    send({ status: false, msg: "Email is invalid" })

 // ****************** Password validation ***********************  
        if (!password)
            return res.
                status(400).
                    send({ status: false, msg: "password is required" })

        if (!isValidPass(password))
            return res.
                status(400).
                    send({ status: false, msg: "password is Allowed with lenght 8-15 only" });

        const loggedInUser = await userModel.findOne({ email: email, password: password })
        if (!loggedInUser)
            return res.
                status(404).
                    send({ status: false, msg: "User is not Exist" })

//++++++++++ Token creation ++++++++++++++++ 
        const token = jwt.sign({ userId: loggedInUser._id.toString() },
            "booksManagement10", { expiresIn: '5000s'})
        // res.header("x-api-key", token)
        res.
            status(200).
                send({ status: true, message: "Token has created", token: token })
    } catch (error) {
        res.
            status(500).
                send({ status: false, msg: error.message })
    }
}


//================================= Exported all the functions here ======================================
module.exports = { createUser, userLogin };


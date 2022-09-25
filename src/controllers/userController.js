//================================= Imported all the modules here ======================================
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel");
const { isValidName, isValidPhone, isValid, isValidEmail, isValidPass,isStreetValid,isValidPin } = require("../validators/validators")

//================================= CREATE USER post/register ======================================
const createUser = async function (req, res) {
    try {
        const data = req.body;

// check data in the request body
        if (!Object.keys(data).length)
            return res.
                status(400).
                send({ status: false, message: "Please provide some data into the request body!!" });

      if(Object.keys(data).length>6)
            return res.
                status(400).
                    send({status:false,message:"invalid data entry inside request body"})
     
    //destructuring
        const { title, name, phone, email, password,address } = data;  

    // ****************** Title validation ***********************    
        
        if (!title) 
            return res.
                status(400).
                    send({ status: false, message: "title is requried" })
        if (!isValid(title)) 
            return res.
                status(400).
                    send({ status: false, message: "title is empty" })
        data.title = title.trim();
        let arr = ["Mr", "Mrs", "Miss"]
        if (!arr.includes(data.title)) 
            return res.
                status(400).
                    send({ status: false, message: "use only Mr, Mrs, Miss" })

// ****************** Name validation ***********************  
        
        if (!name)
            return res.
                status(400).
                    send({ status: false, message: "name is requried" });
        if (!isValidName(name)) 
            return res.
                status(400).
                    send({ status: false, message: "name is not valid" })

// ****************** Phone validation ***********************  
        
        if (!phone) 
            return res.
                status(400).
                    send({ status: false, message: "phone is requried" });
        if (typeof phone == "string") {
            if (!isValidPhone(phone))
                return res.
                    status(400).
                    send({ status: false, message: "mobile number is invalid must be of 10 digits start from [6-9]" })
        }
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
       
       data.email = email.trim()
        if (!isValidEmail(data.email)) 
            return res.
                status(400).
                    send({ status: false, message: "Email is invalid" })
        
        let duplicateEmail = await userModel.findOne({ email: data.email });
        if (duplicateEmail) 
            return res.
                status(400).
                    send({ status: false, message: "Email is already present" });
        
// ****************** Password validation ***********************  
        
        if (!password) 
            return res.
                status(400).
                    send({ status: false, message: "password is requried" })  
         data.password = password.trim()
        if (!isValidPass(data.password)) 
            return res.
                status(400).
                    send({ status: false, message: "Please enter a valid password" })

// ****************** Address validation ***********************                      
        
        if(address){
            if(Object.keys(address).length==0)
                return res.
                    status(400).
                        send({status:false,message:"Address must contain something"})
            else{
            const {street,city,pincode}=address
            if(!(isValid(street) || isValid(city) || isValid(pincode))){
                return res.
                    status(400).
                        send({status:false,msg:"We are looking for street ,city or pincode value only inside Address Object"})
            }
            else{
                if(street){
                   
                    if(!isStreetValid(street))
                        return res.
                            status(400).
                                send({status:false,msg:"street is invalid"})
                
                }if(city){
                    
                    if(!isValidName(city))
                        return res.
                            status(400).
                                send({status:false,msg:"city name is not valid"})
                
                }if(pincode){
                    address.pincode=pincode.trim()
                    if(!isValidPin(address.pincode ))
                        return res.
                            status(400).
                                send({status:false,msg:"pincode must contain only digit with 6 length"})
                
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
                    send({ status: false, message: "Invalid request in queryParams" })

        if (Object.keys(requestbody).length == 0)
            return res.
                status(400).
                    send({ status: false, message: "Data is required in request body" })

        if (Object.keys(requestbody).length > 2)
            return res.
                status(400).
                    send({ status: false, message: "Invalid request in request body" })
    //destructuring
        
        const { email, password } = requestbody  

// ****************** Email validation ***********************          
        
        if (!email)
            return res.
                status(400).
                    send({ status: false, message: "Email is required" })

        if (!isValidEmail(email))
            return res.
                status(400).
                    send({ status: false, message: "Email is invalid" })

 // ****************** Password validation ***********************  
        
        if (!password)
            return res.
                status(400).
                    send({ status: false, message: "password is required" })

        if (!isValidPass(password))
            return res.
                status(400).
                    send({ status: false, message: "password is Allowed with lenght 8-15 only" });

        const loggedInUser = await userModel.findOne({ email: email, password: password })
        if (!loggedInUser)
            return res.
                status(401).
                    send({ status: false, message: "Wrong Credentials" })

//++++++++++ Token creation ++++++++++++++++ 
        
        const token = jwt.sign({ userId: loggedInUser._id.toString() },
            "booksManagementGroup10", { expiresIn: '1h'}           
           )
           
        res.
            status(200).
                send({ status: true, message: "Token has created", data:{token: token}})
    } catch (error) {
        res.
            status(500).
                send({ status: false, msg: error.message })
    }
}


//================================= Exported all the functions here ======================================

module.exports = { createUser, userLogin };


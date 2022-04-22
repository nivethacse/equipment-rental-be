
const db = require("../mongoDB")
const jwt = require ("jsonwebtoken")
const bcrypt = require("bcrypt")
const mailservice = require ("../mail")
const mail = require("../mail")
const service ={

    // regestering the new user
    async register(req , res){
        try{
            const data = await db.userData.findOne({email:req.body.email})
            if(data){
                res.send({message : "email already registered"})
            }else{
                const salt = await bcrypt.genSalt()
                req.body.password = await bcrypt.hash(req.body.password , salt)
                await db.userData.insertOne({...req.body})
                // mail verify
                // mailservice.mailer2(req.body)
                res.send({message :"Registered successfully please login"})
            }
        }catch(error){
            console.log(error)
        }
    },

    // logging in with the crendtials
    async login(req , res){
        try{
            const data = await db.userData.findOne({email:req.body.email})
            if(!data){
                res.send({message:"Enter valid E-mailId"})
            }
            // check for the email-verification if pending
            // tell user to verify the mail
            // else if(data && data.status==="pending"){
            //     return res.send({message : "please verify your mail, check your MailBox"})
            // } 
            else{
                const isValid = await bcrypt.compare(req.body.password , data.password)
                if(isValid){
                    const authToken = jwt.sign({user_id : data._id , email: data.email , name: data.name} , "admin123" ,{expiresIn :"24h"})
                    res.send({message:"Logged in successfully" , authToken , name : data.name,
                    email: data.email , id : data._id})
                }else{
                    res.send({message:"Wrong Password"})
                }
            }

        }catch(error){
            console.log(error)
        }
    }
}

module.exports = service

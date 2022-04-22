
const bcrypt = require("bcrypt")
const db = require("../mongoDB")
const mail = require("../mail")


const resetPass = {
    // reseeting the password
    async reset (req , res){
       try{
            const data = await db.userData.findOne({email:req.body.email})
            if(data){
                await mail.mailer(req.body)
                return res.send({message:"Check Your MailBox"})
            }else{
                res.send({message:"Please Enter Valid E-mailId"})
            }
       }catch(error){
           console.log(error)
       }
    },

    // setting new password
    async updatePassword(req , res){
        try{
            const salt = await bcrypt.genSalt()
            req.body.newPassword = await bcrypt.hash(req.body.newPassword , salt)
            const data = await db.userData.findOne({verifyToken: req.body.tk})
            if(data){
                await db.userData.findOneAndUpdate({email:data.email},{$set:{password:req.body.newPassword , verifyToken : undefined}})
                return res.send({message: "password reseted successfully"})
            }else{
                res.send({message:"Please check your Link"})
            }
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = resetPass;

const db = require("../mongoDB")


const verification ={
    // verifying user mail
    async verifyMail(req , res){
        try{
            const data = await db.userData.findOne({verifyToken : req.params.id})
            if(data){
                await db.userData.findOneAndUpdate({email:data.email},{$set:{status:"verified" , verifyToken:undefined}})
                res.send({message:"Your E-mail is verified successfully"})
            }else{
                res.send("Plaese check your Link")
            }
        }catch(error){
            console.log(error)
        }
       
    }
}

module.exports = verification
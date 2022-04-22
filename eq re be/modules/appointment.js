
const db = require("../mongoDB")
const { ObjectId } = require("bson");

const service = {

    // finding all the appointment data for the user
    async allData (req , res){
        try{
            const data = await db.appointment.find({userId:req.user.user_id}).toArray()
            res.send(data)
        }catch(error){
            console.log(error)
        }
    },

    // inserting an new appointment of users
    async postAppointment (req , res){
        try{
            await db.appointment.insertOne({...req.body , userId : req.user.user_id})
            res.send({message:"Appointment Confirmed"})
        }catch(error){
            console.log(error)
        }
    },

    // updateing an appointment
    async updateAppointment (req , res){
        try{
            const data = await db.appointment.findOneAndUpdate({_id: ObjectId(req.body._id)},{$set:{
                date: req.body.date,
                time: req.body.time,
                servicetype: req.body.serviceType,
                clientName: req.body.clientName,
                clientPhone: req.body.clientPhone,
                email: req.body.email,
                msg: req.body.msg,
            }} , {returnDocument: "after"})
            res.send(data.value)
        }catch(error){
            console.log(error)
        }
    },

    // deleting an appointment
    async deleteAppointment(req , res){
        try{
            const data = await db.appointment.deleteOne({_id:ObjectId(req.body._id)})
            res.send({message:"Your Appointment Deleted Successfully"})
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = service;

const route = require("express").Router();
const service = require("../modules/appointment")

route.get("/appointment" , service.allData);
route.post("/getAppointment" , service.postAppointment);
route.put("/updateAppointment" , service.updateAppointment);
route.put("/cancelAppointment" , service.deleteAppointment);

module.exports = route;


const route = require("express").Router();
const service = require("../modules/resetPassword")

route.put("/reset" , service.reset);
route.put("/updatePassword" , service.updatePassword)

module.exports = route;
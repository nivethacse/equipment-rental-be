
const route = require("express").Router();
const service = require("../modules/verifyMail");

route.put("/:id" , service.verifyMail) 

module.exports = route;
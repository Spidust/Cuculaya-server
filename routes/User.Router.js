const express = require("express");
const router = express.Router();
const Controller = require("../controllers/User.Controller");

router.get("/profile/:uuid", Controller.profile);

router.post("/register", Controller.register);

router.post("/login", Controller.login);
module.exports = router;

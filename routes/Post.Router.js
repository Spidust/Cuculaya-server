const express = require("express");
const router = express.Router();
const Controller = require("../controllers/Post.Controller");
const adminCheck = require("../middleware/adminCheck.js");
const userCheck = require("../middleware/userCheck.js");
//role: all
router.get("/get", Controller.get);

//role: admin
router.post("/create", adminCheck, Controller.create);

//role: all
router.post("/view", Controller.view);

//role: user
router.post("/like", userCheck, Controller.like)


module.exports = router;

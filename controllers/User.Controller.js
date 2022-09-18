const Users = require("../models/User.Modal");
const argon2 = require("argon2");
const generate = require("../helper/tokenGenerate");

module.exports = new (class UserController {
  //get api/user/profile/:uuid

  async profile(req, res) {
    const uuid = req.params.uuid;

    if (!uuid) {
      return res.status(400).json({
        success: false,
        message: "No uuid",
      });
    }
    const { username, liked, role } = await Users.findOne({ uuid });
    const profile = { username, liked, role, uuid };
    if (!profile) {
      return res.status(400).json({
        success: false,
        message: "User isnt defined",
      });
    }

    return res.json({
      success: true,
      profile,
    });
  }

  //post api/user/register
  async register(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        success: false,
        message: "No username or password",
      });
    }
    const username = req.body.username;
    let password = req.body.password;

    if (await Users.findOne({ username })) {
      res.status(400).json({
        success: false,
        message: "Username defined",
      });
    }

    if (username.length < 5 || password.length < 5) {
      res.status(400).json({
        success: false,
        message: "Username or password not valid",
      });
    }

    //all good
    try {
      password = await argon2.hash(password);

      const newUser = new Users({
        username,
        password,
      });
      await newUser.save();

      const token = generate(newUser);

      res.json({
        success: true,
        message: "created",
        accessToken: token,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "An error, account not created",
      });
    }
  }

  //post api/user/login
  async login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "No username or password",
      });
    }

    if (!(await Users.findOne({ username }))) {
      return res.status(400).json({
        success: false,
        message: "Username or password isnt valid",
      });
    }

    const user = await Users.findOne({ username });

    if (!argon2.verify(user.password, password)) {
      return res.status(400).json({
        success: false,
        message: "Username or password isnt valid",
      });
    }

    //all good
    const token = generate(user);

    return res.json({
      success: true,
      message: "logged in",
      accessToken: token,
    });
  }
})();

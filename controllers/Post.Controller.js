const Posts = require("../models/Post.Modal");
const Users = require("../models/User.Modal");
const JWT = require("jsonwebtoken");

const PAGE_SIZE = 10;

module.exports = new (class PostController {
  //get /api/post/get
  get(req, res) {
    let page = req.query.page;
    if (page) {
      page = parseInt(page);
      let skip = (page - 1) * PAGE_SIZE;
      return Posts.find({})
        .skip(skip)
        .limit(PAGE_SIZE)
        .then((data) => res.json(data));
    }
    Posts.find({}).then((data) => res.json(data));
  }
  //post api/post/create
  create(req, res) {
    const title = req.body.title;
    const image = req.body.image;
    if (!title || !image) {
      return res.status(400).json({
        success: false,
        message: "Hmmm..., are you serious",
      });
    }
    try {
      Posts.create({ title, image });
      return res.json({
        success: true,
        message: "Created",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "An error, the post isnt created",
      });
    }
  }
  //post api/post/view
  async view(req, res) {
    if (!req.body.id) {
      res.status(400).json({
        success: false,
        message: "No id",
      });
    }
    try {
      const post = await Posts.findOne({ postId: req.body.id });
      post.view = post.view + 1;
      await post.save();
      res.json({
        success: true,
        message: "Seen",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "An error, the post isnt view",
      });
    }
  }
  //post api/post/like
  async like(req, res) {
    if (!req.body.id) {
      return res.status(400).json({
        success: false,
        message: "No id",
      });
    }
    const post = await Posts.findOne({ postId: req.body.id });
    const user = await Users.findOne({
      uuid: JWT.verify(req.body.token, process.env.SECRET_KEY).uuid,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "You are not logged in",
      });
    }

    if (user.liked.includes(req.body.id)) {
      post.like = post.like - 1;
      post.save();

      user.liked.splice(
        user.liked.indexOf(req.body.id),1
      );

      user.save();
      return res.json({
        success: true,
        message: "Unlike",
      });
    }

    //all good

    post.like = post.like + 1;
    post.save();
    user.liked.push(req.body.id);
    user.save();

    return res.json({ success: true, message: "Liked" });
  }
})();

const PostRouter = require("./Post.Router");
const UserRouter = require("./User.Router");

function Router(app) {
  app.use("/api/post/", PostRouter);
  app.use("/api/user/", UserRouter);
}

module.exports = Router;

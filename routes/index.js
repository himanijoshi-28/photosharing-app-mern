var express = require("express");
var router = express.Router();
const UserModel = require("./users");
const PostModel = require("./post");

const passport = require("passport");

const localStrategy = require("passport-local");
passport.use(new localStrategy(UserModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/login", function (req, res, next) {
  res.render("login", { error: req.flash("error") });
});
router.get("/feed", function (req, res, next) {
  res.render("feed");
});
///profile will not open it u r loggedin
router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile");
});
router.post("/register", (req, res) => {
  const { username, email, fullname } = req.body;
  const userData = new UserModel({ username, email, fullname });

  UserModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {}
);
router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}
module.exports = router;
// router.get("/createUser", async (req, res) => {
//   const createdUser = await UserModel.create({
//     username: "coderelllaa",
//     password: "codes",
//     posts: [],

//     email: "coderellacodes@gmail.com",
//     fullName: "coderella codes",
//   });
//   res.send(createdUser);
// });
// router.get("/createPost", async (req, res) => {
//   const postCreated = await PostModel.create({
//     text: "hello this is second post",
//     user: "6582d13052dffe53c54b4bfe",
//   });
//   const user = await UserModel.findOne({ _id: "6582d13052dffe53c54b4bfe" });
//   user.posts.push(postCreated._id);
//   user.save();
//   res.send("done");
// });
// router.get("/alluserpost", async (req, res) => {
//   let user = await UserModel.findOne({
//     _id: "6582d13052dffe53c54b4bfe",
//   }).populate("posts");
//   res.send(user);
// });

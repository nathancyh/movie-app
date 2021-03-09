const passport = require("passport");

// Knex Setup
const knexConfig = require("../knexfile").development;
const knex = require("knex")(knexConfig);

//Noteservice to render index
const NoteService = require("../services/noteService");
const noteService = new NoteService(knex);

module.exports = (express) => {
  const router = express.Router();
  let userName = "";

  //Check if the user is authenticated
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }

  //Get user id to render on index
  function getUserName(userid) {
    return knex("usertable")
      .select("id", "username")
      .where("id", userid)
      .orderBy("id")
      .then((data) => {
        userName = data[0].username;
        return data[0].username;
      })
      .catch((err) => console.error(err));
  }

  // Serve Main page
  router.get("/", isLoggedIn, function (req, res) {
    console.log("GET MAIN");
    getUserName(req.session.passport.user)
      .then(() => noteService.list(req.session.passport.user))
      .then((noteArr) => {
        res.render("index", {
          currentuser: userName,
          array: noteArr,
        });
      })
      .catch((err) => res.status(500).json(err));
  });

  //Login page
  router.get("/login", (req, res) => {
    res.render("login");
  });

  router.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/",
      failureRedirect: "/error",
    })
  );

  //Signup page
  router.get("/signup", (req, res) => {
    res.render("signup");
  });

  router.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/",
      failureRedirect: "/error",
    })
  );

  //Logout redirect
  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
  });

  router.get("/error", (req, res) => {
    res.send("You are not logged in!");
  });

  return router;
};

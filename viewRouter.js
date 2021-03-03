const passport = require("passport");

// Knex Setup
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

//Noteservice to render index
const NoteService = require("./noteService");
const noteService = new NoteService(knex);

module.exports = (express) => {
  const router = express.Router();

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }

  //TODO: get id for render index
  // return this.knex("usertable")
  //   .whereRaw("username = ?", [user])
  //   .select("id")
  //   .then((data) => {
  //     let userid = data[0].id;

  // Serve Main page
  router.get("/", function (req, res) {
    console.log("GET MAIN");
    noteService
      .list(req.session.passport.user)
      .then((noteArr) => {
        res.render("index", {
          currentuser: req.session.passport.user,
          array: noteArr,
        });
      })
      .catch((err) => res.status(500).json(err));
  });

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

  router.get("/error", (req, res) => {
    res.send("You are not logged in!");
  });

  return router;
};

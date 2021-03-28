const passport = require("passport");

// Knex Setup
const knexConfig = require("../knexfile").development;
const knex = require("knex")(knexConfig);

module.exports = (express) => {
  const router = express.Router();

  // Check if the user is authenticated
  module.exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    const url = req.originalUrl;
    console.log("redirect-query", url);
    // res.redirect(`/login?redirect=${url}`);
    res.redirect("/login");
  };

  //Login page
  router.get("/login", (req, res) => {
    // res.render("login");
    res.render("login", { layout: "empty" });
  });

  router.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/",
      failureRedirect: "/error",
    })
  );

  // router.post("/login", function (req, res, next) {
  //   passport.authenticate("local-login", function (err, user, info) {
  //     if (err) {
  //       return next(err);
  //     }
  //     if (!user) {
  //       return res.redirect("/login");
  //     }
  //     req.logIn(user, function (err) {
  //       if (err) {
  //         return next(err);
  //       }
  //       let redirectTarget = req.get("referrer").split("redirect=")[1];
  //       return req.method == "GET"
  //         ? res.redirect(redirectTarget || "/")
  //         : res.redirect("/");
  //     });
  //   })(req, res, next);
  // });

  //Signup page
  router.get("/signup", (req, res) => {
    // res.render("signup");
    res.render("signup", { layout: "empty" });
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
    res.redirect("/");
  });

  router.get("/error", (req, res) => {
    // res.send("You are not logged in!");
    res.render("error", { layout: "empty" });
  });

  return router;
};

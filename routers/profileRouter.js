"use strict";

// const { app } = require("../app");

module.exports = (express) => {
  const router = express.Router();
  const multer = require("multer");

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, req.session.passport.user + "_" + Date.now());
    },
  });

  var upload = multer({ storage: storage, limits: 1000000 }
  ).single("imageupload");

  //Check if the user is authenticated
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }

  //   function getUserId(userid) {
  //     return knex("users")
  //       .select("id", "name")
  //       .where("id", userid)
  //       .orderBy("id")
  //       .then((data) => {
  //         return data
  //       })
  //       .catch((err) => console.error(err));
  //   }

  router.post("/upload", isLoggedIn, function (req, res) {
    upload(req, res, function (err) {
      res.redirect("/profile");
      if (err) {
        return err;
      }
    });
  });
  return router;
};
"use strict";

// const { app } = require("../app");

module.exports = (express) => {
  const router = express.Router();
  const multer = require("multer");

  // Knex Setup
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const ProfileService = require("../services/profileService");
  const profileService = new ProfileService(knex);


  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname == "profileimageupload") {
        cb(null, "uploads/profiles/");
      } else {
        cb(null, "uploads/screenshot/");
      }
    },
    filename: function (req, file, cb) {
      if (file.fieldname == "profileimageupload") {
        cb(null, "1" + ".jpg");
      } else {
        for (let i = 0; i < req.files.screenshot.length; i++) {
          cb(null, "1" + "_" + i + ".jpg");
        }
      }
    },
  });

  var profileupload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
  }).single("profileimageupload");

  var screenshotupload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
  }).fields([{ name: "screenshot", maxCount: 2 }]);

  //Check if the user is authenticated
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }

  router.post("/upload", function (req, res) {
    profileupload(req, res, function (err) {
      res.redirect("/profile");
      if (err) {
        return err;
      }
    });
  });

  router.post("/upload1", function (req, res) {
    screenshotupload(req, res, function (err) {
      res.redirect("/profile");
      if (err) {
        return err;
      }
    });
  });


  router.put("/", (req, res) => {
    console.log("profile router")
    console.log(req.body)

    return profileService
      .add(1, req.body.fav_movie, req.body['fav_genre[]'], req.body.intro)
      .then(() => { console.log("done"); res.send("added") })
      .catch((err) => res.status(500).json(err));
  })


  return router;
};

"use strict";

module.exports = (express) => {
  const router = express.Router();
  const multer = require("multer");
  const fs = require("fs");
  const { isLoggedIn } = require("./loginRouter");

  // Knex Setup
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const ProfileService = require("../services/profileService");
  const profileService = new ProfileService(knex);

  router.route("/:userid").get(getProfile);
  router
    .route("/edit/:userid")
    .get(isLoggedIn, getProfileEdit)
    .put(isLoggedIn, putProfileEdit);
  router.route("/upload").post(isLoggedIn, postProfilepic);
  router.route("/upload1").post(isLoggedIn, postScreenshots);

  function getProfile(req, res) {
    let user = req.user;
    let screenshot1, screenshot2, profilepic;

    //Check if propic exist, if not render placeholder
    let validateProfiles = fs.promises
      .readdir("./uploads/profiles")
      .then((data) => {
        profilepic = data.find((file) => file == `${req.params.userid}.jpg`);
        if (profilepic === undefined) {
          profilepic = `profileplaceholder.jpg`;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //Check if screenshots exist, if not render placeholder
    let validateScreenshot = fs.promises
      .readdir("./uploads/screenshot")
      .then((data) => {
        screenshot1 = data.find((file) => file == `${req.params.userid}_0.jpg`);
        screenshot2 = data.find((file) => file == `${req.params.userid}_1.jpg`);
        if (screenshot1 === undefined) {
          screenshot1 = `screenshotplaceholder.jpg`;
        }
        if (screenshot2 === undefined) {
          screenshot2 = `screenshotplaceholder.jpg`;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    validateProfiles
      .then(() => validateScreenshot)
      .then(() => {
        return profileService
          .getdata(req.params.userid)
          .then((data) => {
            res.render("profile", {
              user: user,
              profile: profilepic,
              screenshot1: screenshot1,
              screenshot2: screenshot2,
              userid: data[0].id,
              username: data[0].name,
              fav_movie: data[0].fav_movie,
              fav_genre: data[0].fav_genre,
              intro: data[0].intro,
            });
          })
          .catch((err) => res.status(500).json(err));
      });
  }

  function getProfileEdit(req, res) {
    let user = req.user;
    res.render("profileedit", {
      user: user,
      userid: 1, //TODO: change to real userid
    });
  }

  function putProfileEdit(req, res) {
    console.log("edit user put params");
    console.log(req.body.fav_genre);
    return profileService
      .add(
        req.params.userid,
        req.body.fav_movie,
        req.body.fav_genre,
        req.body.intro
      )
      .then(() => {
        console.log("done");
        res.send("put edit profile");
      })
      .catch((err) => res.status(500).json(err));
  }

  function postProfilepic(req, res) {
    profileupload(req, res, function (err) {
      if (err) {
        return err;
      }
    });
  }

  function postScreenshots(req, res) {
    screenshotupload(req, res, function (err) {
      if (err) {
        return err;
      }
    });
  }

  //Multer Configs
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
        cb(null, "1" + ".jpg"); //TODO: change to real userid
      } else {
        for (let i = 0; i < req.files.screenshot.length; i++) {
          cb(null, "1" + "_" + i + ".jpg"); //TODO: change to real userid
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

  return router;
};

// psedudo code
// check if file in system (fsreaddir)
// use js to check if the filename needed exist
//if exist, return working image like to handlebar
//If not exist, return link of default image

"use strict";

module.exports = (express) => {
  const router = express.Router();
  const multer = require("multer");
  const fs = require("fs");
  const axios = require("axios");
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
  // router.route("/upload").post(isLoggedIn, postProfilepic);
  router.route("/upload1").post(isLoggedIn, postScreenshots);

  function getProfile(req, res) {
    let user = req.user;
    let screenshot1, screenshot2, profilepic;
    //Check if propic exist, if not render placeholder
    let validateUploads = fs.promises
      .readdir("./uploads")
      .then((data) => {
        profilepic = data.find((file) => file == `${req.params.userid}_p.jpg`);
        screenshot1 = data.find((file) => file == `${req.params.userid}_0.jpg`);
        screenshot2 = data.find((file) => file == `${req.params.userid}_1.jpg`);
        if (profilepic === undefined) {
          profilepic = `profileplaceholder.jpg`;
        }
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

    //Check if screenshots exist, if not render placeholder
    // let validateScreenshot = fs.promises
    //   .readdir("./uploads")
    //   .then((data) => {
    //     screenshot1 = data.find((file) => file == `${req.params.userid}_0.jpg`);
    //     screenshot2 = data.find((file) => file == `${req.params.userid}_1.jpg`);
    //     if (screenshot1 === undefined) {
    //       screenshot1 = `screenshotplaceholder.jpg`;
    //     }
    //     if (screenshot2 === undefined) {
    //       screenshot2 = `screenshotplaceholder.jpg`;
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    let userData, apiData, moviePoster, movieTitle;
    validateUploads
      .then(() => {
        return profileService.getdata(req.params.userid);
      })
      .then((data) => {
        userData = data;
        moviePoster = `/${profilepic}`;
        if (userData[0].fav_movie) {
          return axios
            .get(
              `https://api.themoviedb.org/3/movie/${userData[0].fav_movie}?api_key=d3fd18f172ad640f103d9cfa9fb37451`
            )
            .then((data2) => {
              apiData = data2.data;
              moviePoster = `https://image.tmdb.org/t/p/w300${apiData.poster_path}`;
              movieTitle = apiData.original_title;
              return apiData;
            })
            .catch((err) => console.log(err));
        }
        return apiData;
      })
      .then(() => {
        res.render("profile", {
          user: user,
          profile: profilepic,
          poster: moviePoster,
          screenshot1: screenshot1,
          screenshot2: screenshot2,
          userid: userData[0].id,
          username: userData[0].name,
          fav_movie: movieTitle,
          fav_genre: userData[0].fav_genre,
          intro: userData[0].intro,
        });
      })
      .catch((err) => res.status(500).json(err));
  }

  function getProfileEdit(req, res) {
    res.render("profileedit", {
      user: req.user,
      userid: req.user.id,
    });
  }

  function putProfileEdit(req, res) {
    console.log("req.body in proRouter");
    console.log(req.body);
    return profileService
      .add(
        req.params.userid,
        req.body.fav_movie,
        req.body.fav_genre,
        req.body.intro
      )
      .then(() => {
        res.send("put edit profile");
      })
      .catch((err) => res.status(500).json(err));
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
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      console.log(file);
      if (file.fieldname == "profileimageupload") {
        cb(null, `${req.user.id}_p.jpg`);
      } else if (file.fieldname == "screenshot0") {
        cb(null, `${req.user.id}_0.jpg`);
      } else if (file.fieldname == "screenshot1") {
        cb(null, `${req.user.id}_1.jpg`);
      }
    },
  });

  var screenshotupload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
  }).fields([
    { name: "profileimageupload", maxCount: 1 },
    { name: "screenshot0", maxCount: 1 },
    { name: "screenshot1", maxCount: 1 },
  ]);

  return router;
};

// psedudo code
// check if file in system (fsreaddir)
// use js to check if the filename needed exist
//if exist, return working image like to handlebar
//If not exist, return link of default image

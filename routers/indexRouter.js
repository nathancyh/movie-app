"use strict";

module.exports = (express) => {
  const router = express.Router();
  const axios = require("axios");

  router.route("/").get(indexCarousel);

  function indexCarousel(req, res) {
    let user = req.user;
    function getTopTen() {
      return axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=f22e6ce68f5e5002e71c20bcba477e7d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1`
        )
        .then((info) => {
          // console.log(info.data.results[0].title);
          // console.log("1")
          return info;
        })
        .catch((err) => res.status(500).json(err));
    }

    function getNowPlaying(req, res) {
      return axios
        .get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=f22e6ce68f5e5002e71c20bcba477e7d&language=en-US&page=1`
        )
        .then((info) => {
          // console.log(info.data.results[1].title);
          // console.log("2");
          return info;
        })
        .catch((err) => res.status(500).json(err));
    }

    function getUpComing(req, res) {
      return axios
        .get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=f22e6ce68f5e5002e71c20bcba477e7d&language=en-US&page=1`
        )
        .then((info) => {
          // console.log(info.data.results[2].title);
          // console.log("3");
          return info;
        })
        .catch((err) => res.status(500).json(err));
    }
    Promise.all([getTopTen(), getNowPlaying(), getUpComing()])
      .then(function (results) {
        const top = [];
        const nowPlaying = [];
        // console.log(results[0].data.results);
        top[0] = results[0].data.results.slice(0, 4);
        top[1] = results[0].data.results.slice(4, 8);
        top[2] = results[0].data.results.slice(8, 12);
        nowPlaying[0] = results[1].data.results.slice(0, 4);
        nowPlaying[1] = results[1].data.results.slice(4, 8);
        nowPlaying[2] = results[1].data.results.slice(8, 12);
        // const upComing = results[2].data.results;

        res.render("index", {
          user: user,
          getTop: top,
          getNow: nowPlaying,
          // getUp: upComing,
        });
      })
      .catch((err) => res.status(500).json(err));
  }
  return router;
};

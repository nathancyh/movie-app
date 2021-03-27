"use strict";

module.exports = (express) => {
  const router = express.Router();
  const axios = require("axios");

  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const WatchlistService = require("../services/watchlistService");
  const watchlistService = new WatchlistService(knex);

  router.route("/").get(indexCarousel);

  function indexCarousel(req, res) {
    let user = req.user;
    function getNowPlaying() {
      return axios
        .get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=f22e6ce68f5e5002e71c20bcba477e7d&language=en-US&page=1`
          // `https://api.themoviedb.org/3/discover/movie?api_key=f22e6ce68f5e5002e71c20bcba477e7d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1`
        )
        .then((info) => {
          // console.log(info.data.results[0].title);
          // console.log("1")
          return info;
        })
        .catch((err) => res.status(500).json(err));
    }

    function getTop(req, res) {
      return axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=f22e6ce68f5e5002e71c20bcba477e7d&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=true&page=1`
          // `https://api.themoviedb.org/3/movie/now_playing?api_key=f22e6ce68f5e5002e71c20bcba477e7d&language=en-US&page=1`
        )
        .then((info) => {
          // console.log(info.data.results[1].title);
          // console.log("2");
          return info;
        })
        .catch((err) => res.status(500).json(err));
    }

    // function getUpComing(req, res) {
    //   return axios
    //     .get(
    //       `https://api.themoviedb.org/3/movie/upcoming?api_key=f22e6ce68f5e5002e71c20bcba477e7d&language=en-US&page=1`
    //     )
    //     .then((info) => {
    //       // console.log(info.data.results[2].title);
    //       // console.log("3");
    //       return info;
    //     })
    //     .catch((err) => res.status(500).json(err));
    // }
    // Promise.all([getTop(), getNowPlaying(), getUpComing()])
    Promise.all([getTop(), getNowPlaying()])
      .then(function (results) {
        const nowPlaying = [];
        const top = [];




        .then((info) => {
          //Input user id and apiArr, return newapiArr with wishlist boolean checks
          if (req.user) {
            return watchlistService
              .findWatchlistBoolean(req.user.id, info)
              .then((data) => {
                searchArr = data;
                return "";
              })
              .catch((err) => console.log(err));
          } else {
            searchArr = info.data.results;
            return "";
          }
        })







        // console.log(results[0].data.results);
        nowPlaying[0] = results[1].data.results.slice(0, 4);
        nowPlaying[1] = results[1].data.results.slice(4, 8);
        nowPlaying[2] = results[1].data.results.slice(8, 12);
        top[0] = results[0].data.results.slice(0, 4);
        top[1] = results[0].data.results.slice(4, 8);
        top[2] = results[0].data.results.slice(8, 12);

        // const upComing = results[2].data.results;

        res.render("index", {
          user: user,
          getNow: nowPlaying,
          getTop: top,
          // getUp: upComing,
        });
      })
      .catch((err) => res.status(500).json(err));
  }
  return router;
};

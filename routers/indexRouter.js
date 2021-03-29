"use strict";

module.exports = (express) => {
  const router = express.Router();
  const axios = require("axios");

  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const WatchlistService = require("../services/watchlistService");
  const watchlistService = new WatchlistService(knex);

  router.get("/", function (req, res) {
    let user = req.user;
    function getNowPlaying() {
      return axios
        .get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=f22e6ce68f5e5002e71c20bcba477e7d&language=en-US&page=1`
        )
        .then((noUserData) => {
          //Input user id and apiArr, return newapiArr with wishlist boolean checks
          if (user) {
            return watchlistService
              .findWatchlistBoolean(req.user.id, noUserData)
              .then((hvUserData) => {
                return hvUserData;
              })
              .catch((err) => console.log(err));
          } else {
            return noUserData.data.results;
          }
        })
        .catch((err) => console.log(err));
    }

    function getTop() {
      return axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=f22e6ce68f5e5002e71c20bcba477e7d&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=true&page=1`
        )
        .then((noUserData2) => {
          //Input user id and apiArr, return newapiArr with wishlist boolean checks
          if (user) {
            // console.log(noUserData2.data.results[0]);
            return watchlistService
              .findWatchlistBoolean(req.user.id, noUserData2)
              .then((hvUserData2) => {
                return hvUserData2;
              })
              .catch((err) => console.log(err));
          } else {
            return noUserData2.data.results;
          }
        })
        .catch((err) => console.log(err));
    }

    Promise.all([getTop(), getNowPlaying()])
      .then(function (results) {
        const nowPlaying = [];
        const top = [];
        // console.log("in indexRouter promise all");
        // console.log(results[0][0].title);
        top[0] = results[0].slice(0, 4);
        top[1] = results[0].slice(4, 8);
        top[2] = results[0].slice(8, 12);
        nowPlaying[0] = results[1].slice(0, 4);
        nowPlaying[1] = results[1].slice(4, 8);
        nowPlaying[2] = results[1].slice(8, 12);

        res.render("index", {
          user: user,
          getNow: nowPlaying,
          getTop: top,
          // getUp: upComing,
        });
      })
      .catch((err) => res.status(500).json(err));
  });
  return router;
};

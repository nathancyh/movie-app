"use strict";

module.exports = (express) => {
  const router = express.Router();
  const axios = require("axios");
  const { isLoggedIn } = require("./loginRouter");

  // Knex Setup
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const MovieService = require("../services/movieService");
  const movieService = new MovieService(knex);
  const WatchlistService = require("../services/watchlistService");
  const watchlistService = new WatchlistService(knex);

  router.route("/").get(isLoggedIn, getWatchlist);
  router.route("/:movieId").post(isLoggedIn, addWatchItem);
  router.route("/:movieId").delete(isLoggedIn, deleteWatchItem);

  function getWatchlist(req, res) {
    return watchlistService
      .watchlistUser(req.user.id)
      .then((data) => {
        let wishArr = data.map((x) => (x = x.movie_id));
        return watchlistService.watchlistMovie(wishArr);
      })
      .then((wishMovieArr) => {
        res.render("watchlist", {
          user: req.user,
          wishMovieArr: wishMovieArr,
        });
      })
      .catch((err) => res.status(500).json(err));
  }

  function addWatchItem(req, res) {
    let apiData;
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${req.params.movieId}?api_key=d3fd18f172ad640f103d9cfa9fb37451`
      )
      .then((info) => {
        apiData = info.data;
        return movieService.checkdata(apiData.id);
      })
      .then((hvData) => {
        //insert into movies table
        if (!hvData) {
          return movieService.insert(apiData);
        } else {
          return;
        }
      })
      .then(() => {
        return watchlistService.checkwatchlist(req.user.id, req.params.movieId);
      })
      .then((hvData) => {
        //insert into watchlist
        if (!hvData) {
          return watchlistService.addWatchlist(req.user.id, req.params.movieId);
        } else {
          return;
        }
      })
      .then(() => res.send("watchlist item added"))
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteWatchItem(req, res) {
    return watchlistService
      .removeWatchlist(req.user.id, req.params.movieId)
      .then(() => {
        res.send("watchlist item deleted");
      })
      .catch((err) => res.status(500).json(err));
  }

  return router;
};

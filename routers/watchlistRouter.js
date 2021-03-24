"use strict";

module.exports = (express) => {
  const router = express.Router();
  const axios = require("axios");

  // Knex Setup
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const WatchlistService = require("../services/watchlistService");
  const watchlistService = new WatchlistService(knex);

  router.route("/").get(getWatchlist);
  router.route("/:movieid").put(addWatchItem);
  router.route("/:movieid").delete(deleteWatchItem);

  function getWatchlist(req, res) {
    return watchlistService
      .watchlistUser(1) //TODO
      .then((data) => {
        let wishArr = data.map((x) => (x = x.movie_id));
        return watchlistService.watchlistMovie(wishArr);
      })
      .then((wishMovieArr) => {
        console.log(wishMovieArr);
        res.render("watchlist", {
          wishMovieArr: wishMovieArr,
        });
      })
      .catch((err) => res.status(500).json(err));
  }

  function addWatchItem(req, res) {
    return watchlistService
      .addWatchlist(1, req.params.movieid) //TODO
      .then(() => {
        res.send("watchlist item added");
      })
      .catch((err) => res.status(500).json(err));
  }

  function deleteWatchItem(req, res) {
    return watchlistService
      .removeWatchlist(1, req.params.movieid) //TODO
      .then(() => {
        res.send("watchlist item deleted");
      })
      .catch((err) => res.status(500).json(err));
  }

  return router;
};

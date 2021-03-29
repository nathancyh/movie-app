"use strict";

module.exports = (express) => {
  console.log("router running");
  const router = express.Router();
  const axios = require("axios");

  // Knex Setup
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const MovieService = require("../services/movieService");
  const movieService = new MovieService(knex);

  const WatchlistService = require("../services/watchlistService");
  const watchlistService = new WatchlistService(knex);

  //Band-Aid dulicate of the isLoggedIn from loginRouter
  const isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    const url = req.originalUrl;
    console.log("redirect-query", url);
    // res.redirect(`/login?redirect=${url}`);
    res.redirect(`/login`);
  };

  router
    .route("/:movieId")
    .get(getReview)
    .post(isLoggedIn, postReview)
    .put(isLoggedIn, putReview)
    .delete(isLoggedIn, deleteReview);

  function getReview(req, res) {
    let user = req.user;
    function getMovieData() {
      let apiData;
      return (
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${req.params.movieId}?api_key=d3fd18f172ad640f103d9cfa9fb37451`
          )
          .then((info) => {
            apiData = info.data;
            //Check if movie data alrady in database, insert to DB if not
            return movieService.checkdata(apiData.id);
          })
          .then((hvData) => {
            if (!hvData) {
              return movieService.insert(apiData);
            } else {
              return;
            }
          })
          //Check if movie is watchlisted
          .then(() => {
            if (user) {
              return watchlistService
                .reviewWatchlistBoolean(req.user.id, apiData)
                .then((hvUserData) => {
                  apiData = hvUserData;
                  return apiData;
                })
                .catch((err) => console.log(err));
            } else {
              //Send data to res.render
              return apiData;
            }
          })
          .catch((err) => {
            console.log("axios get err", err);
          })
      );
    }

    function getMyReview() {
      if (req.isAuthenticated()) {
        return movieService
          .list(req.params.movieId, req.user.id)
          .then((data) => {
            return data;
          })
          .catch((err) => res.status(500).json(err));
      } else {
        return "";
      }
    }

    function getMovieReview() {
      if (req.isAuthenticated()) {
        return movieService
          .listall(req.params.movieId, req.user.id)
          .then((data) => {
            return data;
          })
          .catch((err) => res.status(500).json(err));
      } else {
        return movieService
          .listall(req.params.movieId)
          .then((data) => {
            return data;
          })
          .catch((err) => res.status(500).json(err));
      }
    }

    Promise.all([getMovieData(), getMyReview(), getMovieReview()])
      .then(function (results) {
        const data = results[0];
        const myReview = results[1];
        // console.log("myreview");
        // console.log(results[1]);
        const movieReview = results[2];
        res.render("review", {
          user: user,
          apidata: data,
          myReview: myReview,
          allReview: movieReview,
        });
      })
      .catch((err) => res.status(500).json(err));
  }

  function postReview(req, res) {
    return movieService
      .add(
        req.params.movieId,
        req.user.id,
        req.body.note,
        req.body.title,
        req.body.rating
      )
      .then(() => res.redirect("/"))
      .catch((err) => res.status(500).json(err));
  }

  function putReview(req, res) {
    console.log(req.body);
    return movieService
      .update(
        req.params.movieId,
        req.user.id,
        req.body.edit,
        req.body.title,
        req.body.rating
      )
      .then(() => res.send("put"))
      .catch((err) => res.status(500).json(err));
  }

  function deleteReview(req, res) {
    console.log("delete review");
    return movieService
      .remove(req.params.movieId, req.user.id)
      .then(() => res.send("delete"))
      .catch((err) => res.status(500).json(err));
  }

  //Typeahead: To hide api key from main.js TOO SLOW
  // router.route("/typeahead/:query").get(typeAheadGet);
  // function typeAheadGet(req, res) {
  //   return axios
  //     .get(
  //       `http://api.themoviedb.org/3/search/movie?query=${req.params.query}&api_key=f22e6ce68f5e5002e71c20bcba477e7d`
  //     )
  //     .then((info) => {
  //       res.send(info.data);
  //     })
  //     .catch((err) => {
  //       console.log("axios get err", err);
  //     });
  // }
  return router;
};

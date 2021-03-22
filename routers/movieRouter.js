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

  router
    .route("/:movieId")
    .get(getReview)
    .post(postReview)
    .put(putReview)
    .delete(deleteReview);

  function getReview(req, res) {
    function getMovieData() {
      let apiData;
      return axios
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
        .then(() => {
          //Send data to res.render
          return apiData;
        })
        .catch((err) => {
          console.log("axios get err", err);
        });
    }

    function getMyReview() {
      return movieService
        .list(req.params.movieId, 1) //TODO: replace with real userid
        .then((data) => {
          return data;
        })
        .catch((err) => res.status(500).json(err));
    }

    function getMovieReview() {
      return movieService
        .listall(req.params.movieId, 1) //TODO: replace with real userid
        .then((data) => {
          return data;
        })
        .catch((err) => res.status(500).json(err));
    }

    Promise.all([getMovieData(), getMyReview(), getMovieReview()])
      .then(function (results) {
        const data = results[0];
        const myReview = results[1];
        const movieReview = results[2];

        res.render("review", {
          poster: `https://image.tmdb.org/t/p/w300${data.poster_path}`,
          title: data.title,
          genres: data.genres[0].name,
          releaseDate: data.release_date.slice(0, 4),
          overview: data.overview,
          movieid: data.id,
          myReviewArr: myReview,
          reviewArr: movieReview,
        });
      })
      .catch((err) => res.status(500).json(err));
  }

  function postReview(req, res) {
    console.log("post review");
    return movieService
      .add(
        req.params.movieId,
        1, //TODO: replace with real userid
        req.body.note,
        req.body.title,
        req.body.rating
      )
      .then(() => res.redirect("/"))
      .catch((err) => res.status(500).json(err));
  }

  function putReview(req, res) {
    console.log("update review");
    console.log(req.body);
    return movieService
      .update(
        req.params.movieId,
        1, //TODO: replace with real userid
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
      .remove(req.params.movieId, 1) //TODO: replace with real userid
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

module.exports = (express) => {
  console.log("router running");
  const router = express.Router();
  const axios = require("axios");

  // Knex Setup
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const MovieService = require("../services/movieService");
  const movieService = new MovieService(knex);

  router.get("/:movieId", function (req, res) {
    function getMovieData() {
      let apiData = ""
      return axios
        .get(
          `https://api.themoviedb.org/3/movie/${req.params.movieId}?api_key=d3fd18f172ad640f103d9cfa9fb37451`
        )
        // .then((info) => {
        //   return info.data
        // })
        .then((info) => {
          apiData = info.data
          // console.log("data")
          // console.log(apiData)
          return movieService
        .insert(info.data)
        })
        .then(()=>{
          // console.log(apiData)
          return apiData
        })
        .catch((err) => {
          console.log("axios get err", err);
        });
    }
    function getMyReview() {
      return movieService.list(req.params.movieId, 1)
      .then((data) => {
        return data
      })
      .catch((err) => res.status(500).json(err))
    }
    function getMovieReview() {
      return movieService
        .listall(req.params.movieId, 1)
        .then((data) => {
          // console.log("get review", data)
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
  });

  router.post("/:movieId", function (req, res) {
    console.log("post review");
    return movieService
      .add(req.params.movieId, 1, req.body.note, req.body.title, req.body.rating)
      .then(() => res.redirect("/"))
      .catch((err) => res.status(500).json(err));
  });

  router.put("/:movieId", function (req, res) {
    console.log("update review");
    console.log(req.body)
    return movieService
      .update(req.params.movieId, 1, req.body.edit, req.body.title, req.body.rating)
      .then(() => res.send("put"))
      .catch((err) => res.status(500).json(err));
  });

  router.delete("/:movieId", function (req, res) {
    console.log("delete review");
    return movieService
      .remove(req.params.movieId, 1)
      .then(() => res.send("delete"))
      .catch((err) => res.status(500).json(err));
  });
  return router;
};

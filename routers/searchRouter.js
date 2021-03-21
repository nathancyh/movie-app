"use strict";

module.exports = (express) => {
  const router = express.Router();
  const axios = require("axios");

  router.route("/").get(getSearch);
  router.route("/:query").get(getSearchQuery);

  function getSearch(req, res) {
    return axios
      .get(
        // `https://api.themoviedb.org/3/discover/movie?api_key=f22e6ce68f5e5002e71c20bcba477e7d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28`
        `https://api.themoviedb.org/3/discover/movie?api_key=f22e6ce68f5e5002e71c20bcba477e7d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1`
      )
      .then((info) => {
        // res.send("hello from searchRouter");
        console.log(info.data.results[0]);
        res.render("search", {
          searchArr: info.data.results,
        });
      });
  }

  function getSearchQuery(req, res) {
    return axios
      .get(
        `http://api.themoviedb.org/3/search/movie?query=${req.params.query}&api_key=f22e6ce68f5e5002e71c20bcba477e7d`
      )
      .then((info) => {
        // res.send("hello from searchRouter");
        console.log(info.data.results[0]);
        res.render("search", {
          query: req.params.query,
          searchArr: info.data.results,
        });
      });
  }

  return router;
};

// "https://api.themoviedb.org/3/discover/movie?api_key=f22e6ce68f5e5002e71c20bcba477e7d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28"

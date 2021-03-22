"use strict";

module.exports = (express) => {
  const router = express.Router();
  const axios = require("axios");

  router.route("/").get(getSearch);
  // router.route("?order").get(getSearchQuery);

  function getSearch(req, res) {
    //default popular
    console.log("querystring");
    console.log(req.query);
    let sortOption = "popularity.desc";
    // let sortOption = "vote_count.desc";

    switch (req.query) {
      case "popularity.desc":
        sortOption = "popularity.desc";
        break;

      case "release_date.desc":
        sortOption = "release_date.desc";
        break;

      case "revenue.desc":
        sortOption = "release_date.desc";
        break;
    }

    return axios
      .get(
        // `https://api.themoviedb.org/3/discover/movie?api_key=f22e6ce68f5e5002e71c20bcba477e7d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1`

        `https://api.themoviedb.org/3/discover/movie?api_key=f22e6ce68f5e5002e71c20bcba477e7d&language=en-US&sort_by=${sortOption}&include_adult=false&include_video=true&page=1`
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

//sort_by=
//release_date.asc
//release_date.desc
//revenue.asc
//revenue.desc
//vote_average.asc
//vote_average.desc
//vote_count.asc
//vote_count.desc
// ▲ ▼

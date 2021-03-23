"use strict";

module.exports = (express) => {
  const router = express.Router();
  const axios = require("axios");

  router.route("/").get(getSearch);
  router.route("/:search").get(getSearchQuery);

  function getSearch(req, res) {
    let sortOption = "popularity.desc";
    let sortingDisplay = "Popularity";
    let voteCountGate, genreOption;

    // /search/q=popularity.desc"
    switch (req.query.q) {
      case "popularity.desc":
        sortOption = "popularity.desc";
        sortingDisplay = "Popularity";
        break;
      case "release_date.desc":
        sortOption = "release_date.desc";
        sortingDisplay = "Release Date";
        break;
      case "revenue.desc":
        sortOption = "revenue.desc";
        sortingDisplay = "Revenue";
        break;
      case "vote_average.desc":
        sortOption = "vote_average.desc";
        sortingDisplay = "User Rating";
        voteCountGate = "&vote_count.gte=3000";
        break;
      case "vote_count.desc":
        sortOption = "vote_count.desc";
        sortingDisplay = "Vote Count";
        break;
    }

    return axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=f22e6ce68f5e5002e71c20bcba477e7d&language=en-US&sort_by=${sortOption}&include_adult=false&include_video=true&page=1${voteCountGate}`
      )
      .then((info) => {
        console.log("Query Switch Page");
        // console.log(info.data.results[0].title);
        res.render("search", {
          searchArr: info.data.results,
          sortingDisplay: sortingDisplay,
        });
      })
      .catch((err) => console.log(err));
  }

  // /search/star+wars
  function getSearchQuery(req, res) {
    return axios
      .get(
        `http://api.themoviedb.org/3/search/movie?query=${req.params.search}&api_key=f22e6ce68f5e5002e71c20bcba477e7d`
      )
      .then((info) => {
        console.log("Search String Page");
        // console.log(info.data.results[0].title);
        res.render("search", {
          searchString: req.params.search,
          searchArr: info.data.results,
        });
      })
      .catch((err) => console.log(err));
  }

  return router;
};

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

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

    // /search/sort=popularity.desc"
    switch (req.query.sort) {
      case "popularity.desc":
        sortOption = "popularity.desc";
        sortingDisplay = "Sorted by Popularity Descending";
        break;
      case "release_date.desc":
        sortOption = "release_date.desc";
        sortingDisplay = "Sorted by Release Date Descending";
        break;
      case "revenue.desc":
        sortOption = "revenue.desc";
        sortingDisplay = "Sorted by Revenue Descending";
        break;
      case "vote_average.desc":
        sortOption = "vote_average.desc";
        sortingDisplay = "Sorted by User Rating Descending";
        voteCountGate = "&vote_count.gte=3000";
        break;
      case "vote_count.desc":
        sortOption = "vote_count.desc";
        sortingDisplay = "Sorted by Vote Count Descending";
        break;
    }

    // /search/genre=action"
    switch (req.query.genre) {
      case "action":
        genreOption = "&with_genres=28";
        sortingDisplay = "Action Titles";
        break;
      case "animation":
        genreOption = "&with_genres=16";
        sortingDisplay = "Animation Titles";
        break;
      case "comedy":
        genreOption = "&with_genres=35";
        sortingDisplay = "Comedy Titles";
        break;
      case "drama":
        genreOption = "&with_genres=18";
        sortingDisplay = "Drama Titles";
        break;
      case "fantasy":
        genreOption = "&with_genres=14";
        sortingDisplay = "Fantasy Titles";
        break;
      case "horror":
        genreOption = "&with_genres=27";
        sortingDisplay = "Horror Titles";
        break;
      case "romance":
        genreOption = "&with_genres=10749";
        sortingDisplay = "Romance Titles";
        break;
      case "thriller":
        genreOption = "&with_genres=53";
        sortingDisplay = "Thriller Titles";
        break;
      case "crime":
        genreOption = "&with_genres=80";
        sortingDisplay = "Crime Titles";
        break;
    }

    return axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=f22e6ce68f5e5002e71c20bcba477e7d&language=en-US&sort_by=${sortOption}&include_adult=false&include_video=true&page=1${voteCountGate}${genreOption}`
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

"use strict";

module.exports = (express) => {
  const router = express.Router();
  const axios = require("axios");

  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const WatchlistService = require("../services/watchlistService");
  const watchlistService = new WatchlistService(knex);

  router.route("/").get(getSearch);
  router.route("/:search").get(getSearchQuery);

  let showSort;

  function getSearch(req, res) {
    // let user = req.user;
    let sortOption = "popularity.desc";
    let sortingDisplay = "Popularity";
    let voteCountGate = "";
    let genreOption = "";
    let pageQuery = req.query.page || 1;
    showSort = true;

    //QUERY SWITCHES
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
        voteCountGate = "&vote_count.gte=300";
        console.log(voteCountGate);
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
        showSort = false;
        break;
      case "animation":
        genreOption = "&with_genres=16";
        sortingDisplay = "Animation Titles";
        showSort = false;
        break;
      case "comedy":
        genreOption = "&with_genres=35";
        sortingDisplay = "Comedy Titles";
        showSort = false;
        break;
      case "drama":
        genreOption = "&with_genres=18";
        sortingDisplay = "Drama Titles";
        showSort = false;
        break;
      case "fantasy":
        genreOption = "&with_genres=14";
        sortingDisplay = "Fantasy Titles";
        showSort = false;
        break;
      case "horror":
        genreOption = "&with_genres=27";
        sortingDisplay = "Horror Titles";
        showSort = false;
        break;
      case "romance":
        genreOption = "&with_genres=10749";
        sortingDisplay = "Romance Titles";
        showSort = false;
        break;
      case "thriller":
        genreOption = "&with_genres=53";
        sortingDisplay = "Thriller Titles";
        showSort = false;
        break;
      case "crime":
        genreOption = "&with_genres=80";
        sortingDisplay = "Crime Titles";
        showSort = false;
        break;
    }

    let getURL = `https://api.themoviedb.org/3/discover/movie?api_key=f22e6ce68f5e5002e71c20bcba477e7d&language=en-US&sort_by=${sortOption}&include_adult=false&include_video=true&page=${pageQuery}${voteCountGate}${genreOption}`;
    let searchArr;
    return axios
      .get(getURL)
      .then((info) => {
        //Input user id and apiArr, return newapiArr with wishlist boolean checks
        if (req.isAuthenticated()) {
          return watchlistService
            .findWatchlistBoolean(req.user.id, info)
            .then((data) => {
              searchArr = data;
              return "";
            })
            .catch((err) => console.log(err));
        } else {
          searchArr = info.data.results;
          return "";
        }
      })
      .then(() => {
        res.render("search", {
          user: req.user,
          showSort: showSort,
          searchArr: searchArr,
          sortingDisplay: sortingDisplay,
        });
      })
      .catch((err) => console.log(err));
  }

  // /search/star+wars
  function getSearchQuery(req, res) {
    // let user = req.user;
    showSort = false;
    return axios
      .get(
        `http://api.themoviedb.org/3/search/movie?query=${req.params.search}&api_key=f22e6ce68f5e5002e71c20bcba477e7d`
      )
      .then((info) => {
        // console.log(info.data.results[0].title);
        res.render("search", {
          user: req.user,
          showSort: showSort,
          searchString: req.params.search,
          searchArr: info.data.results,
        });
      })
      .catch((err) => console.log(err));
  }

  return router;
};

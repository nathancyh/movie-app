module.exports = class WatchService {
  constructor(knex) {
    this.knex = knex;
  }

  //Get movies watchlisted by user
  watchlistUser(userid) {
    return this.knex("watchlists")
      .select("user_id", "movie_id")
      .where("user_id", userid)
      .then((data) => {
        return data;
      });
  }

  //Getting array of detail from an array of
  watchlistMovie(wishArr) {
    return this.knex("movies")
      .select(
        "api_id",
        "title",
        "genres",
        "overview",
        "poster_path",
        "release_date",
        "vote_average"
      )
      .whereIn("api_id", wishArr)
      .then((data) => data);
  }

  //Check if  data already in watchlist
  checkwatchlist(userid, movieId) {
    return this.knex("watchlists")
      .where("user_id", userid)
      .andWhere("movie_id", movieId)
      .then((data) => {
        return data.length > 0 ? true : false;
      });
  }

  //Add data to watchlist bridge table
  addWatchlist(userid, movieId) {
    return this.knex("watchlists").insert({
      user_id: userid,
      movie_id: movieId,
    });
  }

  //Remove data from watchlist bridge table
  removeWatchlist(userid, movieId) {
    return this.knex("watchlists")
      .where("movie_id", movieId)
      .andWhere("user_id", userid)
      .del();
  }

  findWatchlistBoolean(userid, apiData) {
    console.log(apiData);
    let apiIdArr = apiData.data.results.map((x) => (x = x.id));
    let boolArr = [];
    return this.watchlistUser(userid).then((userWatchlist) => {
      // console.log("apiIdArr");
      // console.log(apiIdArr);
      // console.log("user data");
      let userWatchlistArr = userWatchlist.map((x) => (x = x.movie_id));
      // console.log(userWatchlistArr);

      apiIdArr.forEach((element) => {
        boolArr.push(userWatchlistArr.includes(element));
      });
      console.log(boolArr);
      return boolArr;
    });
  }
};

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

  addWatchlist(userid, watchlistMovie) {
    return this.knex("watchlists").insert({
      user_id: userid,
      movie_id: watchlistMovie,
    });
  }

  removeWatchlist(userid, watchlistMovie) {
    return this.knex("watchlists")
      .where("movie_id", watchlistMovie)
      .andWhere("user_id", userid)
      .del();
  }

  //Input user id and apiArr, return newapiArr with wishlist boolean checks
  findWatchlistBoolean(userid, apiData) {
    let searchArr = apiData.data.results;
    let apiIdArr = searchArr.map((x) => (x = x.id));
    let boolArr = [];
    return this.watchlistUser(userid)
      .then((userWatchlist) => {
        let userWatchlistArr = userWatchlist.map((x) => (x = x.movie_id));
        apiIdArr.forEach((element) => {
          boolArr.push(userWatchlistArr.includes(element));
        });
        return boolArr;
      })
      .then((boolArr) => {
        for (let index = 0; index < boolArr.length; index++) {
          searchArr[index].watchlistCheck = boolArr[index];
        }
        return searchArr;
      })
      .catch((err) => console.log(err));
  }
};

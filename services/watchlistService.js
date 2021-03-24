module.exports = class WatchService {
  constructor(knex) {
    this.knex = knex;
  }

  watchlistUser(userid) {
    return this.knex("watchlists")
      .select("user_id", "movie_id")
      .where("user_id", userid)
      .then((data) => {
        return data;
      });
  }

  watchlistMovie(wishArr) {
    return (
      this.knex("movies")
        .select(
          "api_id",
          "title",
          "genres",
          "overview",
          "poster_path",
          "release_date",
          "vote_average"
        )
        // .select("*")
        .whereIn("api_id", wishArr)
        .then((data) => data)
    );
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
};

module.exports = class WishlistService {
  constructor(knex) {
    this.knex = knex;
  }

  wishlistUser(userid) {
    return this.knex("wishlists")
      .select("user_id", "movie_id")
      .where("user_id", userid)
      .then((data) => {
        return data;
      });
  }

  wishlistMovie(wishArr) {
    return (
      this.knex("movies")
        .select(
          "api_id",
          "title",
          "genres",
          "overview",
          "poster_path",
          "release_date"
        )
        // .select("*")
        .whereIn("api_id", wishArr)
        .then((data) => data)
    );
  }

  // listMovieData(userid, movieid) {
  //   return this.knex
  //     .select("wishlists.movie_id", "movies.api_id")
  //     .from("wishlists")
  //     .where("wishlists.user_id", userid)
  //     .andWhere("movies.api_id", movieid)
  //     .innerJoin("movies", "wishlists.movie_id", "movies.api_id")
  //     .then((data) => {
  //       console.log("getting movie data from wishlist", data);
  //       return data;
  //     });
  // }

  addWishlist(userid, wishlistMovie) {
    return this.knex("wishlists").insert({
      user_id: userid,
      movie_id: wishlistMovie,
    });
  }
  removeWishlist(userid, wishlistMovie) {
    return this.knex("wishlists")
      .where("movie_id", wishlistMovie)
      .andWhere("user_id", userid)
      .del();
  }
};

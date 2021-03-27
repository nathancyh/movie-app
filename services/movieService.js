module.exports = class MovieService {
  constructor(knex) {
    this.knex = knex;
  }
  //my reviews
  own(userid) {
    return this.knex
      .select(
        "reviews.user_id",
        "reviews.movie_id",
        "reviews.rating",
        "reviews.review_title",
        "reviews.text",
        "users.name"
      )
      .from("reviews")
      .innerJoin("movies", "reviews.movie_id", "movies.api_id")
      .innerJoin("users", "reviews.user_id", "users.id")
      .where("reviews.user_id", userid)
      .then((data) => {
        return data;
      });
  }

  //my review for the movie
  list(movieid, userid) {
    return this.knex
      .select(
        "reviews.user_id",
        "reviews.movie_id",
        "reviews.rating",
        "reviews.review_title",
        "reviews.text",
        "users.name"
      )
      .from("reviews")
      .innerJoin("movies", "reviews.movie_id", "movies.api_id")
      .innerJoin("users", "reviews.user_id", "users.id")
      .where("movies.api_id", movieid)
      .andWhere("reviews.user_id", userid)
      .then((data) => {
        // console.log(data);
        return data;
      });
  }

  //all reviews for the movie
  listall(movieid, userid) {
    let query = this.knex
      .select(
        "reviews.user_id",
        "reviews.movie_id",
        "reviews.rating",
        "reviews.review_title",
        "reviews.text",
        "users.name"
      )
      .from("reviews")
      .innerJoin("movies", "reviews.movie_id", "movies.api_id")
      .innerJoin("users", "reviews.user_id", "users.id")
      .where("movies.api_id", movieid)
      .orderBy("reviews.created_at");

    if (userid) {
      query.whereNot("reviews.user_id", userid);
    }

    return query
      .then((data) => {
        return data;
      })
      .then(null, function (err) {
        //query fail
        console.log(err);
      });
  }

  //Check if movie data already in database
  checkdata(movieid) {
    return this.knex("movies")
      .where({ api_id: movieid })
      .then((data) => {
        return data.length > 0 ? true : false;
      });
  }

  //Insert data from movie API to our own database
  insert(data) {
    // console.log("insert done")
    let genreid = data.genres.map((x) => (x = x.id));

    return this.knex("movies").insert([
      {
        api_id: data.id,
        title: data.title,
        // genres: '{"' + genreid.join('","') + '"}',
        genres: genreid,
        overview: data.overview,
        popularity: data.popularity,
        poster_path: data.poster_path,
        release_date: data.release_date,
        runtime: data.runtime,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
      },
    ]);
  }

  add(movieid, userid, text, title, rating) {
    if (userid) {
      return this.knex("reviews").insert([
        {
          user_id: userid,
          movie_id: movieid,
          review_title: title,
          rating: rating,
          text: text,
        },
      ]);
    } else {
      throw new Error("Cannot add note from non-existent user");
    }
  }

  update(movieid, userid, text, title, rating) {
    return this.knex("reviews")
      .where("user_id", userid)
      .andWhere("movie_id", movieid)
      .update({ review_title: title, rating: rating, text: text });
  }

  remove(movieId, userid) {
    return this.knex("reviews")
      .where("movie_id", movieId)
      .andWhere("user_id", userid)
      .del()
      .catch((err) => console.error(err));
  }
};

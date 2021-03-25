module.exports = class ProfileService {
  constructor(knex) {
    this.knex = knex;
  }

  getdata(userid) {
    return this.knex("users")
      .where("id", userid)
      .select("id", "name", "fav_movie", "fav_genre", "intro")
      .then((data) => {
        return data;
      })
      .catch((err) => res.status(500).json(err));
  }

  add(userid, movie, genre, intro) {
    return this.knex("users")
      .where("id", userid)
      .update({ fav_movie: movie, fav_genre: genre, intro: intro });
  }

  // update(userid, movie, genre, intro) {
  //     return this.knex("users")
  //         .where("id", userid)
  //         .update({ fav_movie: movie, fav_genre: genre, intro: intro })
  // }
};

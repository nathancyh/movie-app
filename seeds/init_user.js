exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { name: "kim", password: "123", intro: "Hello I am Kim.", fav_movie: 11, fav_genre: ["Action", "Romance"] },
      ]);
    });
};

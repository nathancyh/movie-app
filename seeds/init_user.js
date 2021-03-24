exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          name: "kim",
          password:
            "$2b$10$BV/E9N3gN7SNwMmXFup.pOLwW2V2sJMybexbWeViOhbzKMS2/BQMi",
          intro: "Hello I am Kim.",
          fav_movie: 11,
          fav_genre: ["Romance"],
        },
      ]);
    });
};

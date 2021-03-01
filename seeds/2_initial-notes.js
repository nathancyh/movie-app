exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("notetable")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("notetable").insert([
        { id: 1, noterow: "seed1", user_id: 1 },
        { id: 2, noterow: "seed2", user_id: 1 },
        { id: 3, noterow: "seed3", user_id: 1 },
        { id: 4, noterow: "seed1", user_id: 2 },
        { id: 5, noterow: "seed2", user_id: 2 },
        { id: 6, noterow: "seed3", user_id: 2 },
      ]);
    });
};

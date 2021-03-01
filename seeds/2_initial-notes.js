exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("notetable")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("notetable").insert([
        { id: 1, noterow: "seed1", user_id: 1 },
        { id: 2, noterow: "seed1", user_id: 2 },
      ]);
    });
};

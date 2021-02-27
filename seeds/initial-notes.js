exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("notetable")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("notetable").insert([
        { id: 1, username: "Admin", noterow: "seed1" },
        { id: 2, username: "Admin", noterow: "seed2" },
        { id: 3, username: "Admin", noterow: "seed3" },
        { id: 4, username: "Nathan", noterow: "seed1" },
        { id: 5, username: "Nathan", noterow: "seed2" },
        { id: 6, username: "Nathan", noterow: "seed3" },
      ]);
    });
};

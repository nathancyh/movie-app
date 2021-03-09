exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("usertable")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("usertable").insert([
        { id: 1, username: "Admin", password: "super" },
        { id: 2, username: "Nathan", password: "super" },
      ]);
    });
};

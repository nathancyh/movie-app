exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("usertable").insert([
        { username: "Admin", password: "123" },
        { username: "kim", password: "123" },
      ]);
    });
};

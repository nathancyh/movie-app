exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("shopping")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("shopping").insert([
        {
          id: 1,
          title: "White hoodie",
          price: "10.99",
          image: "product-1.jpeg",
        },
      ]);
    });
};

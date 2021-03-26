exports.up = function (knex) {
  return knex.schema.createTable("shopping", (table) => {
    table.increments("id");
    table.varchar("title");
    table.varchar("price");
    table.varchar("image");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("shopping");
};

exports.up = function (knex) {
  return knex.schema.createTable("notetable", (table) => {
    table.increments();
    table.string("username");
    table.string("noterow");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("notetable");
};

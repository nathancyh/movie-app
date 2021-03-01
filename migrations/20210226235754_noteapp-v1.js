exports.up = function (knex) {
  return knex.schema
    .createTable("usertable", (table) => {
      table.increments("id");
      table.string("username");
      table.string("password");
      table.timestamps(false, true);
    })
    .then(() => {
      return knex.schema.createTable("notetable", (table) => {
        table.increments("id");
        table.integer("user_id").unsigned();
        table.foreign("user_id").references("usertable.id");
        table.string("noterow");
        table.timestamps(false, true);
      });
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("notetable")
    .then(() => knex.schema.dropTable("usertable"));
};

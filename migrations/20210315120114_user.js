exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id");
      table.varchar("name").unique();
      table.varchar("password");
      table.varchar("intro");
      table.integer("fav_movie");
      table.specificType("fav_genre", "varchar[]");
      table.timestamps(true, true);
    })
    .then(() => {
      return knex.schema.createTable("movies", (table) => {
        table.increments("id");
        table.integer("api_id").unique();
        table.varchar("title");
        // table.varchar("genres");
        table.specificType("genres", "integer[]");
        table.text("overview");
        table.varchar("popularity");
        table.varchar("poster_path");
        table.varchar("release_date");
        table.varchar("runtime");
        table.decimal("vote_average");
        table.integer("vote_count");
        table.timestamps(true, true);
      });
    })
    .then(() => {
      return knex.schema.createTable("watchlists", (table) => {
        table.increments("id");
        table.integer("user_id").unsigned();
        table.foreign("user_id").references("users.id");
        table.integer("movie_id").unsigned();
        table.foreign("movie_id").references("movies.api_id");
      });
    })
    .then(() => {
      return knex.schema.createTable("reviews", (table) => {
        table.increments("id");
        table.integer("user_id").unsigned();
        table.foreign("user_id").references("users.id");
        table.integer("movie_id").unsigned();
        table.foreign("movie_id").references("movies.api_id");
        table.integer("rating");
        table.varchar("review_title");
        table.text("text");
        table.timestamps(true, true);
      });
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("reviews")
    .then(() => knex.schema.dropTable("watchlists"))
    .then(() => knex.schema.dropTable("movies"))
    .then(() => knex.schema.dropTable("users"));
};

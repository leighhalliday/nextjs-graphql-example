exports.up = function(knex) {
  return knex.schema.createTable("albums", function(table) {
    table.increments("id");
    table.integer("artist_id").notNullable();
    table.string("name", 255).notNullable();
    table.string("year").notNullable();

    table.index("artist_id");
    table.index("name");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("albums");
};

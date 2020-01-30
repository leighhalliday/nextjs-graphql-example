module.exports = {
  development: {
    client: "postgresql",
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      tableName: "knex_migrations"
    }
  }
};

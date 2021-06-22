import pg from "pg";

async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }
  const pool = new pg.Pool({
    connectionString:
      "postgres://fljnyomj:3_kxlO9sfEJLqSKerr596V0hVp68Sjye@motty.db.elephantsql.com/fljnyomj",
  });
  global.connection = pool;
  return pool.connect();
}

export default {
  connect,
};

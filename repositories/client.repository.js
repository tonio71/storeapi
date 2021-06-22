import DB from "./db.js";

async function insertClient(client) {
  const conn = await DB.connect();
  try {
    const sql =
      "INSERT INTO clients (name, cpf, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [
      client.name,
      client.cpf,
      client.phone,
      client.email,
      client.address,
    ];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } finally {
    conn.release();
  }
}

async function getClient(id) {
  const conn = await DB.connect();
  try {
    const sql = "SELECT * FROM clients WHERE client_id=$1";
    const res = await conn.query(sql, [id]);
    return res.rows[0];
  } finally {
    conn.release();
  }
}

async function getClients() {
  const conn = await DB.connect();
  try {
    const sql = "SELECT * FROM clients";
    const res = await conn.query(sql);
    return res.rows;
  } finally {
    conn.release();
  }
}

async function deleteClient(id) {
  const conn = await DB.connect();
  try {
    const sql = "DELETE FROM clients WHERE client_id=$1 ";
    const res = await conn.query(sql, [id]);
    return res.rows[0];
  } finally {
    conn.release();
  }
}

async function updateClient(client) {
  const conn = await DB.connect();
  try {
    const sql =
      " UPDATE clients " +
      "   SET name=$1, cpf=$2, phone=$3, email=$4, address=$5 " +
      "   WHERE client_id=$6 RETURNING *";
    const values = [
      client.name,
      client.cpf,
      client.phone,
      client.email,
      client.address,
      client.client_id,
    ];
    console.log(sql);
    const res = await conn.query(sql, values);
    return res.rows[0];
  } finally {
    conn.release();
  }
}

export default {
  insertClient,
  getClient,
  getClients,
  updateClient,
  deleteClient,
};

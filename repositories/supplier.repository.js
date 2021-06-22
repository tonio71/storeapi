import DB from "./db.js";

async function insertSupplier(supplier) {
  const conn = await DB.connect();
  try {
    const sql =
      "INSERT INTO suppliers (name, cnpj, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [
      supplier.name,
      supplier.cnpj,
      supplier.phone,
      supplier.email,
      supplier.address,
    ];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } finally {
    conn.release();
  }
}

async function getSupplier(id) {
  const conn = await DB.connect();
  try {
    const sql = "SELECT * FROM suppliers WHERE supplier_id=$1";
    const res = await conn.query(sql, [id]);
    return res.rows[0];
  } finally {
    conn.release();
  }
}

async function getSuppliers() {
  const conn = await DB.connect();
  try {
    const sql = "SELECT * FROM suppliers";
    const res = await conn.query(sql);
    return res.rows;
  } finally {
    conn.release();
  }
}

async function deleteSupplier(id) {
  const conn = await DB.connect();
  try {
    const sql = "DELETE FROM suppliers WHERE supplier_id=$1 ";
    const res = await conn.query(sql, [id]);
    return res.rows[0];
  } finally {
    conn.release();
  }
}

async function updateSupplier(supplier) {
  const conn = await DB.connect();
  try {
    const sql =
      " UPDATE suppliers " +
      "   SET name=$1, cnpj=$2, phone=$3, email=$4, address=$5 " +
      "   WHERE supplier_id=$6 RETURNING *";
    const values = [
      supplier.name,
      supplier.cnpj,
      supplier.phone,
      supplier.email,
      supplier.address,
      supplier.supplier_id,
    ];
    console.log(sql);
    const res = await conn.query(sql, values);
    return res.rows[0];
  } finally {
    conn.release();
  }
}

export default {
  insertSupplier,
  getSupplier,
  getSuppliers,
  updateSupplier,
  deleteSupplier,
};

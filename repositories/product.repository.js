import DB from "./db.js";

async function insertProduct(product) {
  const conn = await DB.connect();
  try {
    const sql =
      "INSERT INTO products (name, description, value, stock, supplier_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [
      product.name,
      product.description,
      product.value,
      product.stock,
      product.supplier_id,
    ];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } finally {
    conn.release();
  }
}

async function getProduct(id) {
  const conn = await DB.connect();
  try {
    const sql = "SELECT * FROM products WHERE product_id=$1";
    const res = await conn.query(sql, [id]);
    return res.rows[0];
  } finally {
    conn.release();
  }
}

async function getProducts() {
  const conn = await DB.connect();
  try {
    const sql = "SELECT * FROM products";
    const res = await conn.query(sql);
    return res.rows;
  } finally {
    conn.release();
  }
}

async function deleteProduct(id) {
  const conn = await DB.connect();
  try {
    const sql = "DELETE FROM products WHERE product_id=$1 ";
    const res = await conn.query(sql, [id]);
    return res.rows[0];
  } finally {
    conn.release();
  }
}

async function updateProduct(product) {
  const conn = await DB.connect();
  try {
    const sql =
      " UPDATE products " +
      "   SET name=$1, description=$2, value=$3, stock=$4, supplier_id=$5 " +
      "   WHERE product_id=$6 RETURNING *";
    const values = [
      product.name,
      product.description,
      product.value,
      product.stock,
      product.supplier_id,
      product.product_id,
    ];
    console.log(sql);
    const res = await conn.query(sql, values);
    return res.rows[0];
  } finally {
    conn.release();
  }
}

export default {
  insertProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};

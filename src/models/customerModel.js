const { sql, poolPromise } = require("../db");

const insertCustomers = async (customers) => {
  try {
    const pool = await poolPromise;
    const query = `
      INSERT INTO customers (name, age, email) 
      VALUES ${customers
        .map((c) => `('${c.name}', ${c.age}, '${c.email}')`)
        .join(",")}
    `;

    await pool.request().query(query);
  } catch (err) {
    console.error("Error insertando clientes:", err);
    throw err;
  }
};

const getPaginatedCustomers = async (page, limit) => {
  const offset = (page - 1) * limit;
  try {
    const pool = await poolPromise;

    // Obtener total de registros
    const totalResult = await pool
      .request()
      .query("SELECT COUNT(*) AS total FROM customers");
    const totalRecords = totalResult.recordset[0].total;
    const totalPages = Math.ceil(totalRecords / limit);

    // Obtener los registros paginados
    const result = await pool
      .request()
      .input("limit", limit)
      .input("offset", offset)
      .query(
        `SELECT * FROM customers ORDER BY id 
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`
      );

    return {
      page,
      limit,
      totalRecords,
      totalPages,
      data: result.recordset,
    };
  } catch (err) {
    console.error("Error consultando clientes:", err);
    throw err;
  }
};

const getCustomersByQuery = async (query) => {
  try {
    const pool = await poolPromise;
    const sqlQuery = `SELECT * FROM customers WHERE name LIKE @query OR email LIKE @query`;

    const result = await pool
      .request()
      .input("query", sql.NVarChar, `%${query}%`) // Ahora sql.NVarChar está correctamente importado
      .query(sqlQuery);

    return result.recordset[0];
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    throw new Error("Hubo un problema al buscar detalle de cliente.");
  }
};

module.exports = {
  insertCustomers,
  getPaginatedCustomers,
  getCustomersByQuery,
};

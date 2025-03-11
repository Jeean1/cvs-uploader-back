const fs = require("fs");
const csvParser = require("csv-parser");
const {
  insertCustomers,
  getCustomersByQuery,
} = require("../models/customerModel");

const processCsv = async (filePath) => {
  return new Promise((resolve, reject) => {
    const customers = [];

    fs.createReadStream(filePath)
      .pipe(
        csvParser({
          separator: ",", // Cambia a ";" si tu CSV usa punto y coma
          mapHeaders: ({ header }) => header.trim().toLowerCase(), // Limpia y normaliza nombres de columnas
        })
      )
      .on("data", (row) => {
        console.log("🔍 Fila leída:", row); // <-- Verifica cómo se están leyendo los datos

        customers.push({
          name: row["name"]?.trim().replace(/'/g, "''") || "Desconocido", // Escapa apóstrofos
          age: parseInt(row["age"]?.trim()) || 0, // Si no es un número, pone 0
          email:
            row["email"]?.trim().replace(/'/g, "''") || "sin-email@example.com", // Escapa apóstrofos
        });
      })
      .on("end", async () => {
        try {
          if (customers.length === 0) {
            return reject(
              new Error("El archivo CSV está vacío o tiene formato incorrecto.")
            );
          }

          await insertCustomers(customers);
          fs.unlinkSync(filePath); // Borra el archivo después de procesarlo
          resolve();
        } catch (err) {
          reject(err);
        }
      })
      .on("error", reject);
  });
};

const searchCustomers = async (query) => {
  if (!query) throw new Error("La consulta no puede estar vacía");
  const result = await getCustomersByQuery(query);
  return result;
};

module.exports = { processCsv, searchCustomers };

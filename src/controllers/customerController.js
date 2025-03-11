const { processCsv, searchCustomers } = require("../services/customerService");
const { getPaginatedCustomers } = require("../models/customerModel");

const uploadCsv = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Archivo CSV requerido" });
  }
  const { page = 1, limit = 10 } = req.query;

  try {
    await processCsv(req.file.path);

    const customers = await getPaginatedCustomers(
      parseInt(page),
      parseInt(limit)
    );
    res
      .status(200)
      .json({ message: "Archivo procesado exitosamente", items: customers });
  } catch (err) {
    res.status(500).json({
      error: `Error procesando CSV, detalle: ${err.originalError.message}`,
    });
  }
};

const getCustomers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const customers = await getPaginatedCustomers(
      parseInt(page),
      parseInt(limit)
    );
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo clientes" });
  }
};

const handleSearch = async (req, res) => {
  try {
    const { query } = req.query;
    const customers = await searchCustomers(query);
    res.json(customers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { uploadCsv, getCustomers, handleSearch };

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const customerRoutes = require("./routes/customerRoutes");
const path = require("path");
const fs = require("fs");

const app = express();

// 📌 Verifica si 'uploads/' existe, si no, la crea
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📁 Carpeta uploads/ creada.");
}

dotenv.config();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Para manejar JSON en las peticiones
app.use(morgan("tiny")); //Para visualizar logs de peticiones
app.use(bodyParser.urlencoded({ extended: true })); // Para formularios
app.use(
  cors({
    origin: "http://localhost:3000", // Cambia esto por el dominio del frontend a utilizar
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

//uploads
app.use("/customers", customerRoutes);

app.listen(PORT, () => {
  console.log(`🚀🚀 Server running at http://localhost:${PORT} 🚀🚀`);
});

module.exports = app;

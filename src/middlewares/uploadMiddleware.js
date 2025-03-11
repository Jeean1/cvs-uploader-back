const multer = require("multer");
const fs = require("fs");
const path = require("path");

// 📂 Verificar si la carpeta 'uploads' existe, si no, crearla
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  console.log("📂 Creando la carpeta 'uploads'...");
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 🚀 Configuración de almacenamiento en disco
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("📂 Guardando archivo en:", uploadDir);
    cb(null, uploadDir); // Usar la ruta absoluta
  },
  filename: (req, file, cb) => {
    const newFilename = `${Date.now()}-${file.originalname}`;
    console.log("📄 Nombre final del archivo:", newFilename);
    cb(null, newFilename);
  },
});

// 🛑 Filtro para aceptar solo archivos CSV
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv") {
    console.log("✅ Archivo aceptado:", file.originalname);
    cb(null, true);
  } else {
    console.error("❌ Archivo rechazado:", file.originalname);
    cb(new Error("Formato de archivo no soportado. Solo se permiten archivos CSV."));
  }
};

// 🛠 Configuración de Multer con límite de tamaño (2MB)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

module.exports = upload;

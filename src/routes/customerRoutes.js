const express = require("express");
const {
  uploadCsv,
  getCustomers,
  handleSearch,
} = require("../controllers/customerController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/upload", upload.single("file"), uploadCsv);
router.get("/general", getCustomers);
router.get("/detail", handleSearch);

module.exports = router;

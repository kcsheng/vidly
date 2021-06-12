const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Wecome to vidly");
});

module.exports = router;

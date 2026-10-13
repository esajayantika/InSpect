const express = require("express");

const app = express();

app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend InSpect aktif",
  });
});

app.listen(3000, () => {
  console.log("server berjalan di http://localhost:3000");
});

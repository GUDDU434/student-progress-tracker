const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/start", (req, res) => {
  res.send("welcome to the auth server");
});

// Users Authentication routes
app.use("/api/v1/users", require("./routes/auth.routes"));

// Assignment controller
app.use("/api/v1/assignments", require("./routes/auth.routes"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

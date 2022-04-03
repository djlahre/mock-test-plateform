require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(cors({ exposedHeaders: "x-auth-token" }));
app.use(express.json());

app.use("/api", routes);
app.use((req, res) => res.status(404).json({ msg: "API URL NOT EXIST" }));

app.use(function (err, req, res, next) {
  if (err.name === "ValidationError")
    if (err.details.length > 0)
      return res.status(400).json(err.details.map((obj) => obj.message));

  console.error(err.toString());
  res.status(500).json({ msg: "Server error!!!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});

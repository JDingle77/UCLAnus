express = require("express");
const app = express();
const cors = require("cors");

const axios = require("axios");

app.use(express.json());

const port = process.env.PORT || 4000;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

var db = require("./mongo.js");
const { MinKey } = require("mongodb");

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// routes.js

const express = require("express");
const bathroomController = require("./api/bathroom"); // Import the controller
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/get-bathroom/:bathroomId", bathroomController.getBathroomInfo);
// Add more routes as needed...

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

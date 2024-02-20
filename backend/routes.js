// routes.js

const express = require("express");
const bathroomController = require("./api/bathroom"); // Import the controller
const router = express.Router();

router.get("/get-bathroom", bathroomController.getBathroomInfo);
// Add more routes as needed...

module.exports = router;

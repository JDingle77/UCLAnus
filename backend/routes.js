// routes.js

const express = require("express");
const bathroomController = require("./api/bathroom");
const reviewController = require("./api/review");
const router = express.Router();

router.get("/get-bathroom", bathroomController.getBathroomInfo);
router.get("/get-review", reviewController.getReviewInfo);
router.post("/add-review", reviewController.addReview);
// Add more routes as needed...

module.exports = router;

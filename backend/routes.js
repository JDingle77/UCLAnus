// routes.js

const express = require("express");
const bathroomController = require("./api/bathroom");
const reviewController = require("./api/review");
const userController = require("./api/users");
const favoriteController = require("./api/favorite");
const router = express.Router();

router.get("/get-bathroom", bathroomController.getBathroomInfo);
router.get("/get-review", reviewController.getReviewInfo);
router.post("/add-review", reviewController.addReview);

router.get("/get-user", userController.getUserInfo);
router.post("/update-username", userController.updateUserName);
router.post("/update-name", userController.updateName);
router.post("/submit-report", reviewController.addReport);

router.get("/get-favorite", favoriteController.getFavoriteBathroomInfo);
router.post("/add-favorite", favoriteController.addFavoriteBathroom);
// Add more routes as needed...

module.exports = router;

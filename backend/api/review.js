// review.js
const { connectToDatabase } = require("../mongo.js");
const { v4: uuidv4 } = require("uuid");

/**
 * Retrieves review information based on the provided bathroomId and/or userId.
 * If both bathroomId and userId are provided, retrieves information for the specific review.
 * If only userId is provided, retrieves information for all reviews by userId.
 * If only bathroomId is provided, retrieves information for all reviews by bathroomId.
 * If neither bathroomId nor userId is provided, retrieves information for all reviews.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} - The function sends a response to the client.
 */

// Function to get review information
const getReviewInfo = async (req, res) => {
  const bathroomId = parseInt(req.query.bathroomId, 10);
  const userId = parseInt(req.query.userId, 10);
  console.log("bathroomId " + bathroomId);
  try {
    const db = await connectToDatabase();
    const reviewCollection = db.collection("reviews");
    let reviews;
    if (bathroomId && userId) {
      // If bathroomId and userId is provided, retrieve information for the specific bathroom
      reviews = await reviewCollection
        .find({
          bathroom_id: bathroomId,
          user_id: userId,
        })
        .toArray();
    } else if (userId) {
      // If only userId is provided, retrieve information for all reviews by userId
      reviews = await reviewCollection.find({ user_id: userId }).toArray();
    } else if (bathroomId) {
      // If only bathroomId is provided, retrieve information for all reviews by bathroomId
      reviews = await reviewCollection
        .find({ bathroom_id: bathroomId })
        .toArray();
    } else {
      // If bathroomId and userId is not provided, retrieve information for all reviews
      reviews = await reviewCollection.find({}).toArray();
    }
    if (reviews.length > 0) {
      res.status(200).json(reviews);
    } else {
      res.status(404).json({ message: "No reviews found" });
      return;
    }
  } catch (error) {
    console.error("Error getting bathroom info:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

/**
 * Adds a new review for a bathroom.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} - The function sends a response to the client.
 */

const addReview = async (req, res) => {
    let { bathroomId, userId, rating, description } = req.body;
    userId = parseInt(userId, 10);
  console.log("Trying to add review");
  console.log("Adding bathroom: " + bathroomId);
  try {
    // Validate that required fields are provided
    if (!bathroomId || !userId || !rating) {
      res.status(400).json({
        message: "bathroomId, userId, and rating are required fields.",
      });
      return;
    }

    const db = await connectToDatabase();
    const reviewCollection = db.collection("reviews");
    const bathroomCollection = db.collection("bathrooms");

    const reviewId = generateUniqueReviewId();

    // Create a new review document
    const newReview = {
      review_id: reviewId,
      bathroom_id: bathroomId,
      user_id: userId,
      rating: rating,
      description: description || "",
    };
    // Insert the new review into the collection
    const result = await reviewCollection.insertOne(newReview);

    // Check if the insertion was successful
    if (result.insertedId) {
      const reviewsForBathroom = await reviewCollection
        .find({ bathroom_id: bathroomId })
        .toArray();
      const totalReviews = reviewsForBathroom.length;
      const totalRating = reviewsForBathroom.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;
      const updatedBathroom = await bathroomCollection.findOneAndUpdate(
        { bathroom_id: bathroomId },
        { $set: { rating: averageRating, number_ratings: totalReviews } },
        { returnDocument: "after" }
      );

      res.status(201).json({
        message: "Review added successfully",
        review: newReview,
        updatedBathroom,
      });
      return;
    } else {
      res.status(500).json({ message: "Failed to add review" });
      return;
    }
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Adds a report for a bathroom, marking it as reported or not reported.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} - The function sends a response to the client.
 */

const addReport = async (req, res) => {
  const { bathroomId, userId, reported } = req.body;
  console.log(bathroomId);
  console.log(userId);
  console.log(reported);
  if (!bathroomId || !userId || !reported) {
    res.status(400).json({
      message: "bathroomId, userId, and rating are required fields.",
    });
    return;
  }
  const db = await connectToDatabase();
  const bathroomCollection = db.collection("bathrooms");

  const updatedReport = bathroomCollection.findOneAndUpdate(
    { bathroom_id: bathroomId },
    { $set: { reported: reported } }
  );
  res.status(200);
};
// Function to generate a unique review_id
function generateUniqueReviewId() {
  return uuidv4();
}

module.exports = {
  getReviewInfo,
  addReview,
  addReport,
  // Add more functions as needed...
};

// review.js
const { connectToDatabase } = require("../mongo.js");

// Function to get review information
const getReviewInfo = async (req, res) => {
  const bathroomId = req.query.bathroomId;
  const userId = req.query.userId;

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
    }
  } catch (error) {
    console.error("Error getting bathroom info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addReview = async (req, res) => {
  const { bathroomId, userId, rating, description } = req.body;

  try {
    // Validate that required fields are provided
    if (!bathroomId || !userId || !rating) {
      return res.status(400).json({
        message: "BathroomId, userId, and rating are required fields.",
      });
    }

    const db = await connectToDatabase();
    const reviewCollection = db.collection("reviews");

    // Generate a unique review_id (you may use a library or your own logic)
    const reviewId = generateUniqueReviewId(); // Replace with your actual function

    // Create a new review document
    const newReview = {
      review_id: reviewId,
      bathroom_id: bathroomId,
      user_id: userId,
      rating: rating,
      description: description || "", // optional description field
    };

    // Insert the new review into the collection
    const result = await reviewCollection.insertOne(newReview);

    // Check if the insertion was successful
    if (result.insertedCount === 1) {
      res
        .status(201)
        .json({ message: "Review added successfully", review: newReview });
    } else {
      res.status(500).json({ message: "Failed to add review" });
    }
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to generate a unique review_id (example, replace with your own logic)
function generateUniqueReviewId() {
  // Replace this with your own logic to generate a unique ID
  // You can use a library like 'uuid' or any other method that ensures uniqueness
  return Math.floor(Math.random() * 1000) + 1;
}

module.exports = {
  getReviewInfo,
  addReview,
  // Add more functions as needed...
};

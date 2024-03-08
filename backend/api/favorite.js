// bathroom.js
const { connectToDatabase } = require("../mongo.js");

// Function to get favorite bathroom information
const getFavoriteBathroomInfo = async (req, res) => {
  const userId = parseInt(req.cookies.userId, 10);

  try {
    const db = await connectToDatabase();
    const userCollection = db.collection("users");
    const bathroomCollection = db.collection("bathrooms");
    console.log(userId);
    if (!userId) {
      res.status(400).json({ message: "Missing userId" });
      return;
    }

    // If userId is provided, retrieve information for the specific user
    const userInfo = await userCollection.findOne({
      user_id: userId,
    });

    console.log(userInfo);

    if (!userInfo) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const favoriteBathroomIds = userInfo.favorite_list || [];

    if (favoriteBathroomIds.length === 0) {
      res.status(400).json({ message: "User has no favorites" });
      return;
    }

    const favoriteBathrooms = await bathroomCollection
      .find({
        bathroom_id: { $in: favoriteBathroomIds },
      })
      .toArray();

    res.status(200).json({ favoriteBathrooms });
  } catch (error) {
    console.error("Error getting favorite bathroom info:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

const addFavoriteBathroom = async (req, res) => {
  const { bathroomId, userId } = req.body;

  try {
    const db = await connectToDatabase();
    const userCollection = db.collection("users");

    if (!userId || !bathroomId) {
      res.status(400).json({ message: "Missing parameters" });
      return;
    }

    const result = await userCollection.updateOne(
      { user_id: userId },
      {
        $addToSet: { favorite_list: bathroomId },
      }
    );

    // Check if the update was successful
    if (result.modifiedCount === 1) {
      res.status(200).json({ message: "Bathroom added to favorites" });
      return;
    } else {
      res.status(404).json({ message: "Bathroom already exists in favorites" });
      return;
    }
  } catch (error) {
    console.error("Error adding favorite bathroom:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

module.exports = {
  getFavoriteBathroomInfo,
  addFavoriteBathroom,
  // Add more functions as needed...
};
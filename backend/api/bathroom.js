// bathroom.js
const { connectToDatabase } = require("../mongo.js");

// Function to get bathroom information
const getBathroomInfo = async (req, res) => {
  const bathroomId = parseInt(req.query.bathroomId, 10);

  try {
    const db = await connectToDatabase();
    const bathroomCollection = db.collection("bathrooms");
    if (bathroomId) {
      // If bathroomId is provided, retrieve information for the specific bathroom
      const bathroomInfo = await bathroomCollection.findOne({
        bathroom_id: bathroomId,
      });

      if (bathroomInfo) {
        res.status(200).json(bathroomInfo);
      } else {
        res.status(404).json({ message: "Bathroom not found" });
      }
    } else {
      // If bathroomId is not provided, retrieve information for all bathrooms
      const allBathrooms = await bathroomCollection.find({}).toArray();

      if (allBathrooms.length > 0) {
        res.status(200).json(allBathrooms);
      } else {
        res.status(404).json({ message: "No bathrooms found" });
      }
    }
  } catch (error) {
    console.error("Error getting bathroom info:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getBathroomInfo,
  // Add more functions as needed...
};

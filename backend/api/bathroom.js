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
        return;
      } else {
        res.status(404).json({ message: "Bathroom not found" });
        return;
      }
    } else {
      // If bathroomId is not provided, retrieve information for all bathrooms
      const allBathrooms = await bathroomCollection.find({}).toArray();

      if (allBathrooms.length > 0) {
        res.status(200).json(allBathrooms);
        return;
      } else {
        res.status(404).json({ message: "No bathrooms found" });
        return;
      }
    }
  } catch (error) {
    console.error("Error getting bathroom info:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

const reportBathroom = async (req, res) => {
  const bathroomId = parseInt(req.params.bathroomId, 10);

  try {
    const db = await connectToDatabase();
    const bathroomCollection = db.collection("bathrooms");
    console.log(bathroomId);
    // If bathroomId is provided, reportbathroom
    const result = await bathroomCollection.updateOne(
      { bathroom_id: bathroomId },
      { $set: { reported: 1 } }
    );
    console.log(result);

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: "Bathroom reported successfully" });
      return;
    } else {
      res.status(404).json({ message: "Bathroom not found" });
      return;
    }
  } catch (error) {
    console.error("Error reporting bathroom", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

module.exports = {
  getBathroomInfo,
  reportBathroom,
  // Add more functions as needed...
};

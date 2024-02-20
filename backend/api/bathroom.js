// bathroom.js

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

// Function to get bathroom information
const getBathroomInfo = async (req, res) => {
  const bathroomId = parseInt(req.params.bathroomId);

  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
    });

    const db = client.db("uclanus");
    const bathroomCollection = db.collection("bathrooms");

    const bathroomInfo = await bathroomCollection.findOne({
      bathroom_id: bathroomId,
    });

    if (bathroomInfo) {
      res.status(200).json(bathroomInfo);
    } else {
      res.status(404).json({ message: "Bathroom not found" });
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

const { connectToDatabase } = require("../mongo.js");
const { v4: uuidv4 } = require("uuid");

/**
 * Retrieves user information based on the provided user_id.
 * If user_id is not provided in the query, it attempts to retrieve it from cookies.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} - The function sends a response to the client.
 */

// Function to get review information
const getUserInfo = async (req, res) => {
  let user_id = null;
  console.log(req.query);
  if (req.query.user_id) {
    user_id = parseInt(req.query.user_id, 10);
  } else if (
    req.cookies &&
    req.cookies.userId &&
    req.cookies.userId !== "undefined"
  ) {
    user_id = parseInt(req.cookies.userId, 10);
  }
  if (user_id) {
    const db = await connectToDatabase();
    const userCollection = db.collection("users");

    const user = await userCollection.findOne({ user_id: user_id });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    return res.status(400).json({
      message: "userID is required",
    });
  }
};

/**
 * Updates the username for a user based on the provided value.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} - The function sends a response to the client.
 */

const updateUserName = async (req, res) => {
  const db = await connectToDatabase();
  const userCollection = db.collection("users");
  let userId = parseInt(req.cookies.userId, 10);
  const updatedUserName = userCollection.findOneAndUpdate(
    { user_id: userId },
    { $set: { username: req.body.value } }
  );
  res.status(200);
};

/**
 * Updates the name for a user based on the provided value.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} - The function sends a response to the client.
 */
const updateName = async (req, res) => {
  console.log(req.body);
  const db = await connectToDatabase();
  const userCollection = db.collection("users");
  let userId = parseInt(req.cookies.userId, 10);
  const updatedUserName = userCollection.findOneAndUpdate(
    { user_id: userId },
    { $set: { name: req.body.value } }
  );
  res.status(200);
};

module.exports = {
  getUserInfo,
  updateUserName,
  updateName,
  // Add more functions as needed...
};

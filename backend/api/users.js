const { connectToDatabase } = require("../mongo.js");
const { v4: uuidv4 } = require("uuid");

// Function to get review information
const getUserInfo = async (req, res) => {
    if (req.cookies && req.cookies.userId && req.cookies.userId !== "undefined") {
	const db = await connectToDatabase();
	const userCollection = db.collection("users");

	user = await userCollection.findOne({user_id: parseInt(req.cookies.userId, 10)});

	if (user) {
	    res.status(200).json(user);
	}
	else {
	    res.status(404).json({message: "User not found"});
	}
    }
    else {
	return res.status(400).json({
            message: "userID is required",
	});
    }

};

const updateUserName = async (req, res) => {
    const db = await connectToDatabase();
    const userCollection = db.collection("users");
    let userId = parseInt(req.cookies.userId, 10)
    const updatedUserName = userCollection.findOneAndUpdate(
	{user_id: userId},
	{$set : {username : req.body.value}});
    res.status(200);
}
const updateName = async (req, res) => {
    console.log(req.body);
    const db = await connectToDatabase();
    const userCollection = db.collection("users");
    let userId = parseInt(req.cookies.userId, 10)
    const updatedUserName = userCollection.findOneAndUpdate(
	{user_id: userId},
	{$set : {name : req.body.value}});
    res.status(200);
}

module.exports = {
    getUserInfo,
    updateUserName,
    updateName,
  // Add more functions as needed...
};

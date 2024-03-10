// server.js
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const axios = require("axios");
const { connectToDatabase, setup } = require("./mongo.js");
let { clientID, clientSecret, apiToken } = require("./githubsso.json");


app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 4000;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const startServer = async () => {
  try {
    // Connect to the database
    const db = await connectToDatabase(); // No need to pass the database name here

    // Set up the database (seed data, etc.)
    await setup(db);

    // Assign the connected database instance to a variable
    app.locals.db = db;

    // Use the connected database in your routes
    app.use("/", routes);

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error("Error setting up and starting the server:", error);
    process.exit(1); // Terminate the application if there is an error setting up the server
  }
};

// Call the async function to start the server
if (require.main === module) {
  startServer();
}

app.post("/login", async function (req, res) {
  if (req.cookies && req.cookies.token && req.cookies.token !== "undefined") {
    console.log("Cookie is not Undefined: " + req.cookies.token);
    res.send({
      logged: true,
    });
    return;
  }
  let code = req.body.authcode;
  console.log("Sending this code: " + code);
  axios({
    method: "POST",
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    res.cookie("token", response.data.access_token, { maxAge: 3600000 });
    console.log("Access Token Received: " + response.data.access_token);
    if (
      response.data.access_token === "undefined" ||
      response.data.access_token === undefined
    ) {
      res.send({
        logged: false,
        status: 200,
      });
    } else {
      res.send({
        logged: true,
        status: 200,
      });
    }
  });
});

app.get("/get-userid", async function (req, res) {
    const db = await connectToDatabase();
    
    const userCollection = db.collection("users");
  if (
    !Object.prototype.hasOwnProperty.call(req.cookies, "token") ||
    req.cookies["token"] === "undefined"
  ) {
    res.send(JSON.stringify({ userid: "Temp" }));
  } else {
    axios({
      method: "GET",
      url: `https://api.github.com/user`,
      headers: {
        Authorization: "token " + req.cookies.token,
      },
    }).then(async (response) => {
	console.log("Returning UserID: " + response.data.id);
	res.cookie("userId", response.data.id, { maxAge: 3600000});
	res.send(JSON.stringify({ userid: response.data.id }));
	
	const newUser = {
	    user_id: response.data.id,
	    username: response.data.login,
	    name: response.data.login,
	    profile_pic: null,
	    favorite_list: []
	};

	users = await userCollection.find({user_id: response.data.id}).toArray();
	if (users.length == 0) {
	    console.log("Attempt to submit");
	    const result = await userCollection.insertOne(newUser);
	}
	
    });
  }
});

module.exports = { app, startServer };

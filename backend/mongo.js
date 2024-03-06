// mongo.js
const { MongoClient } = require("mongodb");
const fs = require("fs").promises;
const path = require("path");

const url = "mongodb://localhost:27017/";
const dbName = "uclanus";
const bathroomJsonPath = "./data/bathrooms.json";
const userJsonPath = "./data/users.json";
const reviewsJsonPath = "./data/reviews.json";

const seedDB = async (db) => {
  const bathroomCollection = db.collection("bathrooms");
  try {
    await bathroomCollection.drop();
  } catch (error) {
    console.log("IF THIS IS YOUR FIRST TIME STARTING UP, IGNORE THIS: ", error);
  }
    const bathroomData = JSON.parse(await fs.readFile(bathroomJsonPath, "utf-8"));
    await bathroomCollection.insertMany(bathroomData);

  const userCollection = db.collection("users");
  try {
    await userCollection.drop();
  } catch (error) {
    console.log("IF THIS IS YOUR FIRST TIME STARTING UP, IGNORE THIS: ", error);
  }
    const userData = JSON.parse(await fs.readFile(userJsonPath, "utf-8"));
    await userCollection.insertMany(userData);

    const reviewsCollection = db.collection("reviews");
  try {
    await reviewsCollection.drop();
  } catch (error) {
    console.log("IF THIS IS YOUR FIRST TIME STARTING UP, IGNORE THIS: ", error);
  }
    const reviewsData = JSON.parse(await fs.readFile(reviewsJsonPath, "utf-8"));
    await reviewsCollection.insertMany(reviewsData);

};

const connectToDatabase = async () => {
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
    });
    console.log("Connected to the database");
    return client.db(dbName);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

const setup = async () => {
  const db = await connectToDatabase();
  await seedDB(db);
  console.log("db setup successfully!");
};

module.exports = {
  connectToDatabase,
  setup,
};

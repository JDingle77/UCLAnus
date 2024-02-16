const MongoClient  = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const fs = require("fs")
const path = require("path")
const bathroomJsonPath = "./data/bathrooms.json"

const seedDB = async (db) => {
  const bathroomCollection = db.collection("bathrooms");
  try {
    await bathroomCollection.drop();
  } catch (error) {
    console.log("IF THIS IS YOUR FIRST TIME STARTING UP, IGNORE THIS: ", error);
  }
  const bathroomData = JSON.parse(await fs.promises.readFile(bathroomJsonPath, 'utf-8'));
  await bathroomCollection.insertMany(bathroomData);
};

const setup = async () => {
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true
    });
    const db = client.db('uclanus');
    seedDB(db);
    console.log("db setup successfully!");
  } catch (error) {
    console.log("error", error);
  }
};

setup();


// module.exports = new Mongo();

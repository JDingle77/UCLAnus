require('text-encoding-utf-8');
const request = require("supertest")
const { app, startServer } = require("./server")
beforeAll(async () => {
  await startServer();
});

describe("Get bathroom test", () => {
  test("GET /get-bathroom", async () => {
    const response = await request(app)
      .get("/get-bathroom")
      .expect("Content-Type", /json/)
      .expect(200)
  });
});

describe("Get review success test", () => {
  test("GET /get-review", async () => {
    const queryParams = {
      bathroomId: '11',
      userId: '37492047'
    };
    const response = await request(app)
      .get("/get-review")
      .query(queryParams)
      .expect(200)
  });
});

describe("Get review non existent", () => {
  test("GET /get-review", async () => {
    const queryParams = {
      bathroomId: '8',
      userId: '37492047'
    };
    const response = await request(app)
      .get("/get-review")
      .query(queryParams)
      .expect(404)
  });
});

describe("add review test", () => {
  test("POST /add-review", async () => {

    const requestBody = {
      bathroomId: '9',
      userId: '37492047',
      rating: '3',
    };
    const response = await request(app)
      .post("/add-review")
      .send(requestBody)
      .expect(201)
  });
});

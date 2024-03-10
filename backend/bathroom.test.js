require('text-encoding-utf-8');
const request = require("supertest")
const { app, startServer } = require("./server")
beforeAll(async () => {
  await startServer();
});

describe("Get bathroom test", () => {
  test("GET /get-bathroom", (done) => {
    request(app)
      .get("/get-bathroom")
      .expect("Content-Type", /json/)
      .expect(200).end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe("Get review success test", () => {
  test("GET /get-review", (done) => {
    const queryParams = {
      bathroomId: '11',
      userId: '37492047'
    };
    request(app)
      .get("/get-review")
      .query(queryParams)
      .expect(200).end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe("Get review non existent", () => {
  test("GET /get-review", (done) => {
    const queryParams = {
      bathroomId: '8',
      userId: '37492047'
    };
    request(app)
      .get("/get-review")
      .query(queryParams)
      .expect(404).end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe("add review test", () => {
  test("POST /add-review", (done) => {

    const requestBody = {
      bathroomId: '9',
      userId: '37492047',
      rating: '3',
    };
    request(app)
      .post("/add-review")
      .send(requestBody)
      .expect(201).end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});

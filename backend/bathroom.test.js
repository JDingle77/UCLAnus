require('text-encoding-utf-8');
const request = require("supertest")
const { app, startServer } = require("./server")
beforeAll(async () => {
  // Start your server here
  await startServer();
});

describe("Get bathroom test", () => {
  jest.setTimeout(10000);
  test("GET /get-bathroom", (done) => {
    request(app)
      .get("/get-bathroom")
      .expect(200).end((err, res) => {
        if (err) return done(err);
        return done();
      });
      // Even more logic goes here
  });
  // More things come here
});

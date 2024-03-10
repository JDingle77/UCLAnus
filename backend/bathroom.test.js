const request = require("supertest")
const app = require("./server")

describe("Test example", () => {
  test("getbathrooms", (done) => {
    request(app)
      .get("/get-bathrooms")
      .expect("Content-Type", /json/)
      .expect(200)
      // Even more logic goes here
  });
  // More things come here
});

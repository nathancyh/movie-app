const request = require("supertest");
const app = request();

describe("Route testing", () => {
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  });

  test("GET / should return 401 if authentication is not supplied", (done) => {
    request("http://localhost:8080")
      .get("/")
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  test("GET /api/v1 should return 401 if authentication is not supplied", (done) => {
    request("http://localhost:8080")
      .get("/api/v1")
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });
});

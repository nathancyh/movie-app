const request = require("supertest");
const app = `http://localhost:8080`;

describe("Route Testing", () => {
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  });

  test("GET / should return 401 if authentication is not supplied", (done) => {
    request(app)
      .get("/")
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  test("GET /api/v1 should return 401 if authentication is not supplied", (done) => {
    request(app)
      .get("/api/v1")
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  test("POST /api/v1 it should return 401 if you do not supply a username and password", (done) => {
    request(app)
      .post("/api/v1")
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  test("PUT /api/v1/0 should return 401 if you do not supply a username and password", (done) => {
    request(app)
      .put("/api/v1/0")
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  test("DELETE /api/v1/0 should return 401 if you do not supply a username and password", (done) => {
    request(app)
      .delete("/api/v1/0")
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  test("GET '/random' should return 404 if try to go down non-existent route", (done) => {
    //404 instead of 401 Unauthorized
    var auth = "Basic QWRtaW46c3VwZXI=";
    request(app)
      .get("/random")
      .set("Authorization", auth)
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  test("GET '/' should return the index page", (done) => {
    var auth = "Basic QWRtaW46c3VwZXI=";
    // request(app)
    server
      .post("/login")
      // .set("Authorization", auth)
      // .send({ username: "Nathan", password: "super" })
      // .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });
});

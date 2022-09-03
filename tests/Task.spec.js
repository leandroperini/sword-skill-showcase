const chai = require("chai");
const request = require("supertest");
const expect = chai.expect;

describe("Check /tasks endpoints", async function () {
  beforeEach(function (done) {});
  describe("POST: /", function () {
    it("Should successfully create a new task", function (done) {
      request(app)
        .post("/tasks")
        .send(task)
        .end(function (err, response) {
          expect(response.headers["content-type"]).to.contain(
            "application/json"
          );
          expect(response.status).to.equal(201);
          console.log(response.body);
          expect(response.body).to.contain(task);
          if (err) return done(err);
          return done("7");
        });
    });
  });
});

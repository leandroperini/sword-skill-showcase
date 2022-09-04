const request = require("supertest");
const Task = require("../models/Task");
const { employerDefault } = require("./helpers/defaultEntities");

describe("Check /tasks endpoints", async function () {
  it("Should successfully auth", async function () {
    const manager = await employerDefault.supervisor();
    const employer = await employerDefault.supervised();
    const task = Task.build({
      summary: "Some Summary",
      employerId: employer.id,
    }).toJSON();

    const response = await request(app)
      .post("/tasks")
      .set("Authorization", employerDefault.authHeader(manager))
      .send(task);
    Expect(response.headers["content-type"]).to.contain("application/json");
    Expect(response.status).to.equal(201);
  });
  describe("POST: /", function () {
    it("Should successfully create a new task", async function () {
      const employer = await employerDefault.supervised();
      const task = Task.build({
        summary: "Some Summary",
        employerId: employer.id,
      }).toJSON();
      const response = await request(app)
        .post("/tasks")
        .set("Authorization", employerDefault.authHeader(employer))
        .send(task);
      Expect(response.headers["content-type"]).to.contain("application/json");
      Expect(response.status).to.equal(201);
      console.log(response.body);
      Expect(response.body).to.jsonEqual({
        ...task,
        id: 1,
      });
    });
  });
});

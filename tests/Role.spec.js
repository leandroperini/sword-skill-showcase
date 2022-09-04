const request = require("supertest");
const Permissions = require("../models/Role/Permissions.js");
const Role = require("../models/Role/Role");
const { roleDefault, employerDefault } = require("./helpers/defaultEntities");

describe("Check /roles endpoints", function (done) {
  describe("POST: /", function (done) {
    it("Should successfully create a new role", async function () {
      const roleJson = {
        name: "Role Name",
        permissions: [
          Permissions.TASK_READ_OWN,
          Permissions.TASK_DELETE_OWN,
          Permissions.ALL,
        ],
      };
      const res = await request(app)
        .post("/roles")
        .set("Authorization", await employerDefault.authHeaderDefault())
        .send(roleJson);
      Expect(res.status).to.equal(201);
      Expect(res.headers["content-type"]).to.contain("application/json");
      const roleDb = await Role.findOne({ limit: 1, order: [["id", "desc"]] });
      Expect(res.body).to.be.jsonEqual({
        id: roleDb.id,
        ...roleJson,
      });
    });
  });
  describe("GET: /", function (done) {
    it("Should successfully retrieve all roles", async function () {
      await roleDefault.supervised();
      const res = await request(app)
        .get("/roles")
        .set("Authorization", await employerDefault.authHeaderDefault());
      Expect(res.status).equal(200);
      Expect(res.headers["content-type"]).to.contain("application/json");
      Expect(res.body).to.be.an("array").that.have.lengthOf(1);
      Expect(res.body[0])
        .to.be.an("object")
        .that.have.jsonEqual((await roleDefault.supervised()).toJSON());
    });
  });
});

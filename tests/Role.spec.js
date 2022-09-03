const request = require("supertest");
const Permissions = require("../models/Role/Permissions.js");
const Role = require("../models/Role/Role");
const db = require("../db/setup");

const role = {
  name: "Role Name",
  permissions: [
    Permissions.TASK_READ_OWN,
    Permissions.TASK_DELETE_OWN,
    Permissions.ALL,
  ],
};

describe("Check /roles endpoints", function (done) {
  beforeEach(async function () {
    await clearDb();
  });
  describe("POST: /", function (done) {
    it("Should successfully create a new role", async function () {
      const res = await request(app).post("/roles").send(role);
      Expect(res.status).to.equal(201);
      Expect(res.headers["content-type"]).to.contain("application/json");
      const roleDb = await Role.findAll({ limit: 1 });
      Expect(res.body).to.be.jsonEqual({
        id: roleDb[0].id,
        ...role,
      });
    });
  });
  describe("GET: /", function (done) {
    beforeEach(async function () {
      roleDb = await Role.create(role);
    });
    it("Should successfully retrieve all roles", async function () {
      const res = await request(app).get("/roles");
      Expect(res.status).equal(200);
      Expect(res.headers["content-type"]).to.contain("application/json");
      Expect(res.body).to.be.an("array").that.have.lengthOf(1);
      Expect(res.body[0])
        .to.be.an("object")
        .that.have.jsonEqual(roleDb.toJSON());
    });
  });

  afterEach(async function () {
    await clearDb();
  });
});

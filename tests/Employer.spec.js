const request = require("supertest");
const Permissions = require("../models/Role/Permissions");
const Role = require("../models/Role/Role");
const Employer = require("../models/Employer");
const db = require("../db/setup");

describe("Check /employers endpoints", function (done) {
  beforeEach(async function () {
    await clearDb();
    role = await Role.create({
      name: "root",
      permissions: [Permissions.ALL],
    });
    boss = await Employer.create({
      name: "Employerson Senior",
      roleId: role.id,
    });
  });
  describe("POST: /", function (done) {
    it("Should successfully create a new employer", async function () {
      const res = await request(app).post("/employers").send(employer);
      Expect(res.status).to.equal(201);
      Expect(res.headers["content-type"]).to.contain("application/json");
      const employerDb = await Employer.findAll({ limit: 1 });
      Expect(res.body).to.be.jsonEqual({
        id: employerDb[0].id,
        ...employer,
      });
    });
  });
  describe("GET: /", function (done) {
    beforeEach(async function () {
      employerDb = await Employer.create({
        name: "Employerson Junior",
        roleId: role,
        respondsTo: boss,
      });
      console.log(employerDb);
    });
    it("Should successfully retrieve all employers", async function () {
      const res = await request(app).get("/employers");
      Expect(res.status).equal(200);
      Expect(res.headers["content-type"]).to.contain("application/json");
      Expect(res.body).to.be.an("array").that.have.lengthOf(2);
      Expect(res.body[1])
        .to.be.an("object")
        .that.have.jsonEqual(employerDb.toJSON());
    });
  });

  afterEach(async function () {
    await clearDb();
  });
});

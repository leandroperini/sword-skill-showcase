const request = require("supertest");
const Employer = require("../models/Employer");
const {
  roleDefault,
  employerDefault,
  clearInstances,
} = require("./helpers/defaultEntities");

describe("Check /employers endpoints", function () {
  describe("POST: /", function () {
    it("Should successfully create a new employer", async function () {
      const employerToSave = Employer.build({
        name: "Employerson Junior",
        roleId: (await roleDefault.supervised()).id,
        respondsTo: (await employerDefault.supervisor()).id,
      });

      const res = await request(app)
        .post("/employers")
        .set("Authorization", await employerDefault.authHeaderDefault())
        .send(employerToSave.toJSON());

      Expect(res.status).to.equal(201);
      Expect(res.headers["content-type"]).to.contain("application/json");

      const employerDb = await Employer.findOne({
        order: [["id", "desc"]],
      });

      Expect(res.body).to.be.jsonEqual({
        ...employerToSave.toJSON(),
        id: employerDb.id,
      });
    });
  });
  describe("GET: /", function () {
    it("Should successfully retrieve all employers", async function () {
      const supervised = await employerDefault.supervised();
      console.log(supervised.toJSON());
      const res = await request(app)
        .get("/employers")
        .set("Authorization", await employerDefault.authHeaderDefault());
      Expect(res.status).equal(200);
      Expect(res.headers["content-type"]).to.contain("application/json");
      Expect(res.body).to.be.an("array").that.have.lengthOf(2);
      Expect(res.body[1]).that.have.jsonEqual(supervised.toJSON());
    });
  });
});

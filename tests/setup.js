require("dotenv").config({ path: __dirname + "/../.env.test" });
const db = require("../db/setup");
app = require("../app");
handleTestFailure = require("./helpers/errorHandler");
const { clearInstances } = require("./helpers/defaultEntities");
clearDb = require("./helpers/clearDb");
Chai = require("chai");
chaiJsonEqual = require("chai-json-equal");
Chai.use(chaiJsonEqual);
Chai.config.includeStack = true;
Chai.config.showDiff = true;
Expect = Chai.expect;

module.exports;
let transaction;
exports.mochaHooks = {
  async beforeAll() {},
  async beforeEach() {
    await clearInstances();
    transaction = await db.transaction();
  },
  async afterEach() {
    await transaction.rollback();
  },
  async afterAll() {
    await db.close();
  },
};

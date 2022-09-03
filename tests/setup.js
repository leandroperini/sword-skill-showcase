require("dotenv").config({ path: __dirname + "/../.env.test" });
const db = require("../db/setup");
app = require("../app");
handleTestFailure = require("./helpers/errorHandler");
clearDb = require("./helpers/clearDb");
Chai = require("chai");
chaiJsonEqual = require("chai-json-equal");
Chai.use(chaiJsonEqual);
Chai.config.includeStack = true;
Chai.config.showDiff = true;
Expect = Chai.expect;

module.exports;

const { AssertionError } = require("chai");
const handleTestFailure = (err, res, done, tests) => {
  try {
    if (tests) tests(err, res);
    if (done) return done();
  } catch (testFailure) {
    testFailure.message =
      (err?.name || "") +
      "\n" +
      (err?.message || "") +
      "\n" +
      (res?.error?.name || "") +
      "\n" +
      (res?.error?.text || "") +
      "\n" +
      (testFailure?.name || "") +
      "\n" +
      (testFailure.message || "") +
      "\n";

    testFailure.stack =
      (err?.stack || "") +
      "\n" +
      (res?.error?.stack || "") +
      "\n" +
      (testFailure.stack || "") +
      "\n";
    return done(testFailure);
  }
  if (done && err) {
    return done(err);
  } else if (err) {
    throw err;
  }
};

module.exports = handleTestFailure;

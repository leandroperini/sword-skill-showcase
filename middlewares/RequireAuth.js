const createError = require("http-errors");
const db = require("../db/setup");
const Crypto = require("crypto");

const getToken = (pass, salt) => {
  return Crypto.createHash("sha512")
    .update(pass + salt, "utf8")
    .digest("hex");
};
const getTokenByEmployer = (employer) => {
  return getToken(employer.id + employer.name + process.env.SALT);
};

const toBase64 = (value) => {
  return Buffer.from(value).toString("base64");
};

const fromBase64 = (value) => {
  return Buffer.from(value, "base64").toString("utf8");
};

const authenticate = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      return next(createError(403, "Auth data not found!"));
    }
    const basic = req.headers["authorization"].split("Basic ")[1];
    const userIdToken = fromBase64(basic);
    const [sentUserId, sentToken] = userIdToken.split("=");

    if (!sentUserId) {
      return next(createError(403, "Invalid user Id!"));
    }

    const user = await db.model("Employer").findByPk(sentUserId);
    if (!user.id) {
      return next(createError(403, "User not found!"));
    }

    if (!sentToken) {
      return next(createError(403, "Token not found!"));
    }

    const token = user.token;
    if (token !== sentToken) {
      return next(createError(403, "Token invalid!"));
    }
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports.toBase64 = toBase64;
module.exports.fromBase64 = fromBase64;
module.exports.getToken = getToken;
module.exports.getTokenByEmployer = getTokenByEmployer;
module.exports.authenticate = authenticate;

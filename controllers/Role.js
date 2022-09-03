const Role = require("../models/Role/Role");
module.exports.insert = (req, res, next) => {
  Role.create(req.body)
    .then((role) => res.status(201).json(role))
    .catch((err) => next(err));
};

module.exports.get = (req, res, next) => {
  Role.findAll()
    .then((role) => res.json(role))
    .catch((err) => next(err));
};

const Employer = require("../models/Employer");
module.exports.insert = (req, res, next) => {
  Employer.create(req.body)
    .then((employer) => res.status(201).json(employer))
    .catch((err) => next(err));
};

module.exports.get = (req, res, next) => {
  Employer.findAll()
    .then((employer) => res.json(employer))
    .catch((err) => next(err));
};

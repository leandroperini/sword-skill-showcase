const Task = require("../models/Task");
module.exports.insert = async (req, res, next) => {
  Task.create(req.body).then((task) => res.status(201).json(task));
};

module.exports.get = (req, res, next) => {
  Task.findAll().then((task) => res.json(task));
};

const Task = require('../models/Task')
module.exports.insert = async (req, res, next) => {
    const task = Task.fromJson(req.body);
    result = await task.save(() => {
        console.log("AISUASIKHADLIAHDLPASH");
    });
    console.log(result);
    console.log(task);
}


module.exports.get = (req, res, next) => {
    res.json('some message');
}
const permissions = {
  ALL: "all",
  TASK_ALL: "task_all",
  TASK_CREATE_OWN: "task_create_own",
  TASK_UPDATE_OWN: "task_update_own",
  TASK_DELETE_OWN: "task_delete_own",
  TASK_READ_OWN: "task_read_own",
};

const list = Object.values(permissions);
const has = (permission) => list.includes(permission);
const validate = (permission) => {
  if (!has(permission)) {
    throw new Error("Permission '" + permission + "' not found");
  }
};

module.exports = permissions;
module.exports.list = list;
module.exports.has = has;
module.exports.validate = validate;
module.exports.validateString = (value) => {
  value.split(";").forEach(validate);
};

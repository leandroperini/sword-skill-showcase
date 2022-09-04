const clearDb = require("../helpers/clearDb");
const Permissions = require("../../models/Role/Permissions");
const Role = require("../../models/Role/Role");
const Employer = require("../../models/Employer");
const { toBase64 } = require("../../middlewares/RequireAuth");

let roleRoot;
let roleSupervised;
let supervisor;
let supervised;

const roleDefault = {
  root: async () => {
    roleRoot =
      roleRoot instanceof Role
        ? roleRoot
        : await Role.create({
            name: "root",
            permissions: [Permissions.ALL],
          });
    return roleRoot;
  },
  supervised: async () => {
    roleSupervised =
      roleSupervised instanceof Role
        ? roleSupervised
        : await Role.create({
            name: "root",
            permissions: [
              Permissions.TASK_DELETE_OWN,
              Permissions.TASK_CREATE_OWN,
            ],
          });
    return roleSupervised;
  },
};
module.exports.roleDefault = roleDefault;

const employerDefault = {
  supervisor: async () => {
    const role = await roleDefault.root();
    supervisor =
      supervisor instanceof Employer
        ? supervisor
        : await Employer.create({
            name: "Employerson Senior",
            roleId: role.id,
          });
    supervisor = await supervisor.reload();
    return supervisor;
  },

  supervised: async () => {
    const manager = await employerDefault.supervisor();
    const role = await roleDefault.supervised();
    supervised =
      supervised instanceof Employer
        ? supervised
        : await Employer.create({
            name: "Employerson Junior",
            roleId: role.id,
            respondsTo: manager.id,
          });
    supervised = await supervised.reload();
    return supervised;
  },

  authHeader: (employer) =>
    "Basic " + toBase64(employer.id + "=" + employer.token),

  authHeaderDefault: async () =>
    "Basic " +
    toBase64(
      (await employerDefault.supervisor()).id +
        "=" +
        (await employerDefault.supervisor()).token
    ),
};
module.exports.employerDefault = employerDefault;

const clearInstances = async () => {
  await clearDb();
  roleRoot = null;
  roleSupervised = null;
  supervisor = null;
  supervised = null;
};
module.exports.clearInstances = clearInstances;

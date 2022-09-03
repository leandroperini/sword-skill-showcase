const db = require("../../db/setup");
module.exports = async () => {
  await db.query("SET FOREIGN_KEY_CHECKS = 0", null);
  await db.truncate({ cascade: true, force: true, truncate: true });
  await db.query("SET FOREIGN_KEY_CHECKS = 1", null);
};

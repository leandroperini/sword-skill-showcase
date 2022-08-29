const db = require('mysql2');
exports.up = () => {
    const query =
        "CREATE TABLE IF NOT EXISTS `employers` (" +
        "  `id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "  `name` varchar(255) DEFAULT NULL," +
        "  `respondsTo` int(10) unsigned DEFAULT NULL," +
        "  `roleId` int(10) unsigned DEFAULT NULL," +
        "  PRIMARY KEY (`id`)," +
        "  KEY `employers_respondsto_foreign` (`respondsTo`)," +
        "  KEY `employers_roleid_foreign` (`roleId`)," +
        "  CONSTRAINT `employers_respondsto_foreign` FOREIGN KEY (`respondsTo`) REFERENCES `employers` (`id`)," +
        "  CONSTRAINT `employers_roleid_foreign` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`)" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; " +
        "CREATE TABLE IF NOT EXISTS `roles` (" +
        "  `id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "  `name` varchar(255) DEFAULT NULL," +
        "  `permissions` varchar(255) DEFAULT NULL," +
        "  PRIMARY KEY (`id`)," +
        "  KEY `roles_permissions_index` (`permissions`)" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; " +
        "CREATE TABLE IF NOT EXISTS `tasks` (" +
        "  `id` int(10) unsigned NOT NULL AUTO_INCREMENT," +
        "  `summary` varchar(2500) DEFAULT NULL," +
        "  `employerId` int(10) unsigned DEFAULT NULL," +
        "  `createdAt` DATETIME NULL DEFAULT NULL," +
        "  PRIMARY KEY (`id`)," +
        "  KEY `tasks_employerid_foreign` (`employerId`)," +
        "  CONSTRAINT `tasks_employerid_foreign` FOREIGN KEY (`employerId`) REFERENCES `employers` (`id`)" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    db.runQuery(query);
};

const db = require('../db/setup')
class Role{
    get id () {
        return this._id;
    }

    set id (value) {
        this._id = value;
    }

    get name () {
        return this._name;
    }

    set name (value) {
        this._name = value;
    }

    get permissions () {
        return this._permissions.split(';');
    }

    /**
     *
     * @param {array} value
     */
    set permissions (value) {
        this._permissions = value.join(';');
    }


    /**
     *
     * @param {int} id
     * @param {string} name
     * @param {string} permissions
     */
    constructor (id, name, permissions) {

        this._id = id;
        this._name = name;
        this._permissions = permissions;
    }

    static get tableName () {
        return 'role';
    }

    static get idColumn () {
        return 'id';
    }
    async save (callback) {
        return await db.runQuery(
            "insert into " + Role.tableName + " set ?", {
                name: this.name,
                permissions: this._permissions
            }, (error, results, fields) => {
                console.log(results);
                console.log(error);
                console.log(fields);
                if (error) throw error;
                this.id = results.insertId
                if(callback) callback();
            }).then(()=>{
            console.log('VAIEEEEEEEE');
        });
    }

    /**
     *
     * @param {JSON} json
     * @returns {Role}
     */
    static fromJson (json) {
        return new Role(json.id || null, json.name || null, json.permissions || null)
    }
}

module.exports = Role;
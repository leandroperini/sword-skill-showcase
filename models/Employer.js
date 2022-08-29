const db = require('../db/setup')
const Role = require('./Role');
class Employer {
    get id () {
        return this._id;
    }

    get name () {
        return this._name;
    }

    get respondsTo () {
        return this._respondsTo;
    }

    get role () {
        return this._role;
    }

    set id (value) {
        this._id = value;
    }

    set name (value) {
        this._name = value;
    }

    set respondsTo (value) {
        this._respondsTo = value;
    }

    set role (value) {
        this._role = value;
    }

    /**
     *
     * @param {int} id
     * @param {string} name
     * @param {Employer} respondsTo
     * @param {Role} role
     */
    constructor (id, name, respondsTo, role) {
        this._id = id;
        this._name = name;
        this._respondsTo = respondsTo;
        this._role = role;
    }

    static get tableName () {
        return 'employer';
    }

    static get idColumn () {
        return 'id';
    }

    async save (callback) {
        return await db.runQuery(
            "insert into " + Employer.tableName + " set ?", {
                name: this.name,
                respondsTo: this.respondsTo.id,
                roleId: this.role.id
            }, (error, results, fields) => {
                console.log(results);
                console.log(error);
                console.log(fields);
                if (error) throw error;
                this.id = results.insertId
                if(callback) callback();
            });
    }

    /**
     *
     * @param {JSON} json
     * @returns {Employer}
     */
    static fromJson (json) {
        return new Employer(
            json.id || null,
            json.name || null,
            json.respondsTo ? Employer.fromJson(json.respondsTo) : null,
            json.role ? Role.fromJson(json.role) : null,
        );
    }
}

module.exports = Employer;

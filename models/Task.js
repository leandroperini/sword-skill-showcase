const db = require('../db/setup')
const Employer = require('./Employer');
class Task {
    get createdAt () {
        return this._createdAt;
    }

    set createdAt (value) {
        this._createdAt = value;
    }

    get id () {
        return this._id;
    }

    set id (value) {
        this._id = value;
    }

    get summary () {
        return this._summary;
    }

    set summary (value) {
        this._summary = value;
    }

    get employer () {
        return this._employer;
    }

    set employer (value) {
        this._employer = value;
    }

    /**
     *
     * @param {int} id
     * @param {string} summary
     * @param {Employer} employer
     * @param {Date} createdAt
     */
    constructor (id, summary, employer, createdAt) {

        this._id = id;
        this._summary = summary;
        this._employer = employer;
        this._createdAt = createdAt || new Date();
    }

    static get tableName () {
        return 'tasks';
    }

    static get idColumn () {
        return 'id';
    }

    async save (callback) {
        return await db.runQuery(
            "insert into " + Task.tableName + " set ?", {
                summary: this.summary,
                employerId: this.employer.id,
                createdAt: this.createdAt
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
     * @returns {Task}
     */
    static fromJson (json) {
        return new Task(
            json.id || null,
            json.summary || null,
            json.employer ? Employer.fromJson(json.employer) : null,
            json.createdAt || null
        );
    }
}

module.exports = Task;

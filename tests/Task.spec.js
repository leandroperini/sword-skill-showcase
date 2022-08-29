const chai = require('chai');
const rewire = require('rewire');
const request = require('supertest');
const debug = require('debug');
const expect = chai.expect;
const Employer = require('../models/Employer');
const Role = require('../models/Role');
const app = require('../app');


describe('Check /tasks endpoints', async function () {
    before(async function (done) {
        this.role = Role.fromJson({
            name: 'Test Role',
            permissions: 'ALL'
        });
        roleResult = await role.save().then((done) => {
            this.employer = Employer.fromJson({
                name: 'Testson Senior',
                role: role
            });
            employerResult = employer.save().then((done) => {
                this.employer2 = Employer.fromJson({
                    name: 'Testson Junior',
                    respondsTo: employer,
                    role: role
                });
                employer2Result = employer2.save().then((done) => done('1'));
                return done('2');
            });
            console.log(employerResult)
            console.log(employer)
            return done('3');
        });
        console.log(roleResult)
        console.log(role)
        console.log(employer2Result)
        console.log(employer2)
        return done('4');
    }).then(function (done){
        console.log('sakdbshdkljfjbsdlkjfbjslfbjskljjb');
        return done('5');
    });
    beforeEach(function (done) {
        console.log(this.employer2);
        Task = rewire('../models/Task');
        task = Task.fromJson({
            summary: 'Some summary text',
            employer: this.employer2,
        });
        console.log(task);
        return done('6')
    });
    describe('POST: /', function () {
        it('Should successfully create a new task', function (done) {
            request(app)
                .post('/tasks')
                .send(task)
                .end(function (err, response) {
                    expect(response.headers['content-type']).to.contain('application/json');
                    expect(response.status).to.equal(201)
                    console.log(response.body);
                    expect(response.body).to.contain(task);
                    if (err) return done(err);
                    return done('7');
                })
        });
    });
});

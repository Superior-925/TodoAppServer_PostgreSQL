process.env.NODE_ENV = 'development';

let sequelize = require("sequelize");
const models = require('../models');
const { Todo } = models;
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Todos', function () {
    beforeEach((done) => {
        Todo.destroy({
            where: {},
            truncate: true
        });
        done();
    });

    describe('/GET todo', function () {
        it('it should GET all todos', (done) => {
            chai.request(server)
                .get('/todos')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    this.timeout(0);
                    done();
                });
        });
    });


    describe('/POST todo', function () {
        it('it should not POST a todo without isDone field', (done) => {
            let todo = {
                taskText: 'Some task'
            };
            chai.request(server)
                .post('/todos')
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('taskText').eql('Some task');
                    res.body.should.have.property('isDone').eql(false);
                    done();
                });
        });

        it('it should POST a todo ', (done) => {
            let todo = {
                taskText: 'Some task',
                isDone: false
            };
            chai.request(server)
                .post('/todos')
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('taskText').eql('Some task');
                    res.body.should.have.property('isDone').eql(false);
                    done();
                });
        });
    });

    describe('/PATCH/:id todo', function () {
        it('it should UPDATE a todo given the id', (done) => {
            let todo = new Todo({taskText: "Task for updating", isDone: false});
            todo.save((err, todo) => {
                chai.request(server)
                    .patch('/todos/:id' + todo.id)
                    .send({taskText: "Task for updating", isDone: true})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('id');
                        res.body.should.have.property('taskText').eql('Task for updating');
                        res.body.should.have.property('isDone').eql(true);
                        done();
                    });
            });
        });
    });

    describe('/delete', function () {
        it('it should DELETE a todo by id', (done) => {
            let todo = new Todo({taskText: "Task for delete", isDone: true});
            todo.save((err, book) => {
                chai.request(server)
                    .delete('/todos' + todo.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });
    });

});

let sequelize = require("sequelize");
const models = require('../models');
const { Todo } = models;
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

function query (taskText) {
    let todo = Todo.build({taskText: taskText, isDone: false});
    return todo.save();
}

describe('Todos', function () {

    beforeEach(async () => {
        await Todo.destroy({
            where: {},
            truncate: true
        });
    });

    describe('/GET todo', function () {
        it('it should GET empty todos array', (done) => {
            chai.request(server)
                .get('/todos')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/GET todo', function () {
        it('it should GET all todos', (done) => {
            let N =3;
            for (let i = 1; i <= N; i++) {
                query("Todo №" + i)
            }
            chai.request(server)
                .get('/todos')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(3);
                    done();
                });
        });
    });

    describe('/POST todo', function () {
        it('it should not POST a todo without taskText field', (done) => {
            let todo = {
                isDone: false
            };
            chai.request(server)
                .post('/todos')
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(500);
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
           query('Task for updating').then(result => {
                chai.request(server)
                    .patch('/todos/' + result.id)
                    .set('content-type', 'application/json')
                    .send({isDone: result.isDone})
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
        it('it should DELETE all todos', (done) => {
            query('Task for deleting')
                chai.request(server)
                    .delete('/todos')
                    .set('content-type', 'application/json')
                    .send('[]')
                    .end((err, res) => {
                        res.should.have.status(204);
                        done();
                    });
        });
    });

    describe('/delete', function () {

        it('it should delete a todo given the id', (done) => {
           query('Task for deleting').then(result => {
                chai.request(server)
                    .delete('/todos')
                    .set('content-type', 'application/json')
                    .send([result.id])
                    .end((err, res) => {
                        res.should.have.status(204);
                        done();
                    });
            });
        });

    });

});
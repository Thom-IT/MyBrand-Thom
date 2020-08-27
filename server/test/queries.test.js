import chai from 'chai';
import chaiHttp from 'chai-http';
import http from 'http';
import app from '../index';
import bodyParser from 'body-parser';
const should = chai.should;
chai.should();
chai.use(chaiHttp);
const { expect } = chai;
chai.use(chaiHttp);
let adminToken;
let qryId;
let userId;
describe("/server running", () => {
    it('should return 200 ok status', (done) => {
        chai
            .request(app)
            .get("/")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.have.property("message");
                done();
            });
    });
});
describe('POST /api/user/login', () => {
    it('should return 200 on success', (done) => {
        chai.request(app)
            .post('/api/user/login')
            .send({
                email: "uwa102@gmail.com",
                password: "123456",
            })
            .end((error, response) => {
                adminToken = response.body.token;
                console.log(adminToken)
                response.should.have.status(200);
                done();
            });
    });
    it('it should not allow a user to login', (done) => {
        chai.request(app)
            .post('/api/user/login')
            .send({
                email: "uwa102@gmail.com",
                password: "12345", //wrong password
            })
            .end((error, response) => {
                //adminToken = response.body.token;
                response.should.have.status(400);
                done();
            });
    });
    it('it should not allow a user to login, URL not valid', (done) => {
        chai.request(app)
            .post('/api/user/') //'/api/user/login'
            .send({
                email: "uwa102@gmail.com",
                password: "123456",
            })
            .end((error, response) => {
                //adminToken = response.body.token;
                response.should.have.status(404);
                done();
            });
    });
});
describe('POST /queries/', () => {
    it('should create a new query', (done) => {
        const querydata = {
            name: "Mukunzi",
            email: "mukmaforo@gmail.com",
            query: "Dear Admin, I hope My Email finds you well. I would like to request that we can negociate how to work together cause I'm a busness man!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",

        };
        chai.request(app)
            .post('/queries/')
            // .set('auth-token', adminToken)
            .send(querydata)
            .end((error, response) => {
                qryId = response.body.createdBlog._id;
                console.log(response.body)
                response.should.have.status(201);
                response.should.be.an('object');
                done();
            });

    });
    it('should return 400 when not valid(Bad Request)', (done) => {
        const querydata = {
            name: "",
            email: "mukmaforo@gmail.com",
            query: "Dear Admin, I hope My Email finds you well. I would like to request that we can negociate how to work together cause I'm a busness man!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",

        };
        chai.request(app)
            .post('/queries/')
            .set('auth-token', adminToken)
            .send(querydata)
            .end((error, response) => {
                // blogId = response.body.createdBlog._id;
                console.log(response.body)
                response.should.have.status(400);
                //  response.should.be.an('object');
                done();
            });

    });
});
describe('GET /queries/=>should return 200 on success', () => {
    it('should GET ALL queries', (done) => {
        chai.request(app)
            .get('/queries/')
            .set('auth-token', adminToken)
            .end((error, response) => {
                response.should.have.status(200);
                response.body.blogsData.should.be.an('array');
                done();
            });
    });
    it('should return 401 when user is not authenticated', (done) => {

        const querydata = {
            name: "Mukunzi",
            email: "mukmaforo@gmail.com",
            query: "Dear Admin, I hope My Email finds you well. I would like to request that we can negociate how to work together cause I'm a busness man!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",

        };

        chai.request(app)
            .post('/queries/')
            // .set('auth-token', adminToken)
            .send(querydata)
            .end((error, response) => {
                console.log(response.body)
                response.should.have.status(401);
                done();
            });

    });
    it('should NOT GET ALL queries', (done) => {
        chai.request(app)
            .get('/q') //wrong URL
            .set('auth-token', adminToken)
            .end((error, response) => {
                response.should.have.status(404);
                //  response.text.should.be.eq("Not found, check well your URL");
                done();
            });

    });
});
describe('GET /queries/:id', () => {
    it('should GET a query by id', (done) => {
        // const blogId = "5f4126de3f3d7f18b4467b55";
        chai.request(app)
            .get('/queries/' + id)
            .set('auth-token', adminToken)
            //.send(blog)
            .end((error, response) => {
                response.should.have.status(200);
                response.body.blogs.should.be.an('object');
                done();
            });

    });

});
//comment
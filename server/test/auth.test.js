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
let blogId;
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

//describe('wrong endpoint', () => {
//     it('should return 400 bad request status', (done) => {
//         chai
//             .request(app)
//             .get("")
//             .end((err, res) => {
//                 expect(res).to.have.status(400);
//                 expect(res.body).to.have.property("Error");
//                 done();
//             })
//     });
// })
// end of testing server
describe('POST /api/user/createUser', () => {
    it('should POST a new User', (done) => {
        const user = {
            name: "Uwimana",
            email: "uwa102@gmail.com",
            password: "123456",

        };
        chai.request(app)
            .post('/api/user/createUser')
            //.set('auth-token', adminToken)
            .send(user)
            .end((error, response) => {
                response.should.have.status(200);
                response.should.be.an('object');
                done();
            });

    });
    it('should NOT POST a new User', (done) => {
        const blog = {
            name: "Uwimana",
            email: "uwagmail.com", //wrong email
            password: "123456",

        };
        chai.request(app)
            .post('/api/user/createUser')
            // .set('auth-token', adminToken)
            .send(blog)
            .end((error, response) => {
                //adminToken = response.body.token;
                response.should.have.status(400);
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

//Testing Blogs
describe('POST /blogs/', () => {
    it('should POST a new Blog', (done) => {
        const blog = {
            title: "Bolgs BY mukunzi",
            photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRnltfxyRHuEEUE4gIZp9fr77Q8goigP7mQ6Q&usqp=CAU",
            description: "the is the image that shows how to become a Bloger",

        };
        chai.request(app)
            .post('/blogs/')
            .set('auth-token', adminToken)
            .send(blog)
            .end((error, response) => {
                blogId = response.body.createdBlog._id;
                console.log(response.body)
                response.should.have.status(201);
                response.should.be.an('object');
                done();
            });

    });
    it('should return 400 when not valid(Bad Request)', (done) => {
        const blog = {
            title: "Bo",
            photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRnltfxyRHuEEUE4gIZp9fr77Q8goigP7mQ6Q&usqp=CAU",
            description: "",

        };
        chai.request(app)
            .post('/blogs/')
            .set('auth-token', adminToken)
            .send(blog)
            .end((error, response) => {
                // blogId = response.body.createdBlog._id;
                console.log(response.body)
                response.should.have.status(400);
                //  response.should.be.an('object');
                done();
            });

    });
    it('should return 401 when user is not authenticated', (done) => {
        const blog = {
            title: "Blog by Thomas MUKUNZI",
            photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRnltfxyRHuEEUE4gIZp9fr77Q8goigP7mQ6Q&usqp=CAU",
            description: "Welcome to this Blog post, here you can view in full the application",

        };
        chai.request(app)
            .post('/blogs/')
            // .set('auth-token', adminToken)
            .send(blog)
            .end((error, response) => {
                console.log(response.body)
                response.should.have.status(401);
                done();
            });

    });
});
// it('should 400 when invalid content-length', function(done) {
//     var urlencodedParser = bodyParser.urlencoded()
//     var server = http.createServer(function(req, res, next) {
//         req.headers['content-length'] = '20' // bad length
//         urlencodedParser(req, res, next)
//     })

//     chai.request(server)
//         .post('/')
//         .set('Content-Type', 'application/x-www-form-urlencoded')
//         .send('str=')
//         .eexpect(400, /content length/, done)
// })
describe('GET /blogs/=>should return 200 on success', () => {
    it('should GET ALL Blogs', (done) => {
        chai.request(app)
            .get('/blogs/')
            .end((error, response) => {
                response.should.have.status(200);
                response.body.blogsData.should.be.an('array');
                done();
            });
    });
    it('should GET ALL Blogs', (done) => {
        chai.request(app)
            .get('/blogs/')
            .end((error, response) => {
                response.should.have.status(200);
                response.body.blogsData.should.be.an('array');
                done();
            });

    });
    it('should NOT GET ALL Blogs', (done) => {
        chai.request(app)
            .get('/blog') //wrong URL
            .end((error, response) => {
                response.should.have.status(404);
                //  response.text.should.be.eq("Not found, check well your URL");
                done();
            });

    });
});
describe('GET /blogs/:blogId', () => {
    it('should GET a Blog by blogId', (done) => {
        // const blogId = "5f4126de3f3d7f18b4467b55";
        chai.request(app)
            .get('/blogs/' + blogId)
            // .set('token', adminToken)
            //.send(blog)
            .end((error, response) => {
                response.should.have.status(200);
                response.body.blogs.should.be.an('object');
                done();
            });

    });

});
describe('PATCH /blogs/:blogId', () => {
    it('should PATCH an Existing Blog', (done) => {
        const blog = {
            title: "Bolgs BY mukunzi PATCH",
            photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRnltfxyRHuEEUE4gIZp9fr77Q8goigP7mQ6Q&usqp=CAU",
            description: "the is the image that shows how to become a Bloger UPDATES",
        };
        chai.request(app)
            .patch('/blogs/' + blogId)
            .set('auth-token', adminToken)
            .send(blog)
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.an('object');
                done();
            });

    });

}); //========================================================comments and Likes===================================
describe('POST /blogs/comment/:blogId', () => {
    it('should POST comment on Existing Blog', (done) => {
        const blog = {
            name: "Mukunzi",
            comment: "Great Job"

        };
        chai.request(app)
            .post(`/blogs/comment/${blogId}`)
            .set('auth-token', adminToken)
            .send(blog)
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.an('object');
                done();
            });

    });


    describe('POST /blogs/likes/:blogId', () => {
        it('should POST like on Existing Blog', (done) => {

            chai.request(app)
                .post(`/blogs/likes/${blogId}`)
                .set('auth-token', adminToken)
                //.send(blog)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.an('object');
                    done();
                });

        });

    });

    //======================================================
    describe('DELETE /blogs/:blogId', () => {
        it('should DELETE an Existing Blog', (done) => {
            chai.request(app)
                .delete('/blogs/' + blogId)
                .set('auth-token', adminToken)
                .end((error, response) => {
                    response.should.have.status(200);
                    done();
                });
        });
        it('should NOT DELETE an Existing Blog', (done) => {
            chai.request(app)
                .delete('/blogs' + blogId)
                .set('auth-token', adminToken)
                .end((error, response) => {
                    response.should.have.status(404);

                    done();
                });

        });
        it('should NOT PATCH an Existing Blog', (done) => {
            const blog = {
                title: "Blog updates",
                photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRnltfxyRHuEEUE4gIZp9fr77Q8goigP7mQ6Q&usqp=CAU",
                description: "the is the image that shows how to become a Bloger UPDATES",

            };
            chai.request(app)
                .patch('/blogs/' + blogId)
                .set('auth-token', adminToken)
                .send(blog)
                .end((error, response) => {
                    // blogId = response.body._id;
                    response.should.have.status(404);
                    done();
                });
        });
        it('should not GET a Blog by blogId', (done) => {
            chai.request(app)
                .get('/blogs/' + blogId)
                .set('auth-token', adminToken)
                .end((error, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
        it('should NOT POST likes on an Existing Blog', (done) => {
            chai.request(app)
                .post(`/blogs/likes/${blogId}`)
                .set('auth-token', adminToken)
                //.send(blog)
                .end((error, response) => {
                    // blogId = response.body._id;
                    response.should.have.status(404);
                    done();
                });
        });
        it('should NOT POST comment on an Existing Blog', (done) => {
            const blog = {
                name: "",
                comment: "Well Done"

            };
            chai.request(app)
                .post(`/blogs/comment/${blogId}`)
                .set('auth-token', adminToken)
                .send(blog)
                .end((error, response) => {
                    // blogId = response.body._id;
                    response.should.have.status(404);
                    done();
                });
        });
    });
});


//comment
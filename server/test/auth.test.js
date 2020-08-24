import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../index');
const should = chai.should;
chai.should();
chai.use(chaiHttp);

let adminToken;
let blogId;
let userId;

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
//npm install @babel/node @babel/preset-env @babel/plugin-transform-runtime @babel/register


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


                // response.should.have.property('_id');
                //response.body.blogsData.
                //should.have.property('title').eq("Bolgs BY mukunzi");
                //  response.should.have.property('photoUrl').eq("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRnltfxyRHuEEUE4gIZp9fr77Q8goigP7mQ6Q&usqp=CAU");
                // response.should.have.property('description').eq("the is the image that shows how to become a Bloger");
                // response.should.have.property('date');
                done();
            });

    });
});

describe('GET /blogs/', () => {
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
                response.text.should.be.eq("Not found, check well your URL");
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
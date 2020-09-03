[![Coverage Status](https://coveralls.io/repos/github/Thom-IT/MyBrand-Thom/badge.svg?branch=ft-coveralls)](https://coveralls.io/github/Thom-IT/MyBrand-Thom?branch=ft-coveralls)
[![Build Status](https://travis-ci.com/Thom-IT/MyBrand-Thom.svg?branch=Develop)](https://travis-ci.com/Thom-IT/MyBrand-Thom)

My Brand-Thomas Website 

features 
ADMIN:
      .can login into his account.
      .can create a blog post.
      .can edit a blog post.
      .can delete a blog post.
      .can view all queries.

NORMAL USERS:      
      .can view all blog post.
      .can view a specific blog post.


       .add a comment on a specific blog post.
       .can like a specific blog post.

UI Template 
[Click here](https://mybrandthom.netlify.app/)

API Host
[Click here](https://mybrandthomas.herokuapp.com/)

API Documentation 
[Click here](https://mybrandthomas.herokuapp.com/api-docs/)

Technologies && Tools

NodeJS - JavaScript Runtime Environment
ExpressJs - A Minimal Web Application Framework
MongoDb - A document database, which means it stores data in JSON-like documents.
Mocha - A JavaScript test framework for Node.js programs, asynchronous testing, test coverage reports, and use of any assertion library

Getting Started

Prerequisites
Ensure you have NodeJS installed on your computer by entering node -v on your terminal. If you don't have NodeJS installed go to the NodeJS Website, and follow the download instructions

Installation
Clone the app

https://github.com/Thom-IT/MyBrand-Thom.git

Install all the packages

npm install
Run the server

npm start
Testing
Run Test case

npm run test
Working Routes

EndpointFunctionality
|-----------------------------------------------------------------------------
|POST /api/user/login	       admin log into his account                    |
|----------------------------------------------------------------------------|
|POST /blogs/	             Admin create a blog post                      |
|----------------------------------------------------------------------------|
|GET /blogs/	             user can retrieve all blog posts              |
|----------------------------------------------------------------------------|
|GET /blogs/:blogId	       user retrieve a specific blog post            |
|----------------------------------------------------------------------------|
|PATCH /blogs/:blogId	       Admin modify a specific blog post             |
|----------------------------------------------------------------------------|
|DELETE /blogs/:blogId	       Admin can delete a specific blog post         |
|----------------------------- ----------------------------------------------|
|POST /posts/comment/:blogId	 user can add a comment on a specific blog post|
|----------------------------------------------------------------------------|
|POST /posts/likes/:blogId	 user can add a like on a specific blog post   |
|----------------------------------------------------------------------------|
|POST /queries/	             user can create a query                       |
|----------------------------------------------------------------------------|
|GET /queries/	             Admin retrieve all queries                    |
|----------------------------------------------------------------------------|

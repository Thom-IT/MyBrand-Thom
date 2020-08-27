[![Coverage Status](https://coveralls.io/repos/github/Thom-IT/MyBrand-Thom/badge.svg?branch=ft-coveralls)](https://coveralls.io/github/Thom-IT/MyBrand-Thom?branch=ft-coveralls)
[![Build Status](https://travis-ci.com/Thom-IT/MyBrand-Thom.svg?branch=Develop)](https://travis-ci.com/Thom-IT/MyBrand-Thom)

My Brand-Thomas Website 🎉

features ✨
ADMIN:
      . can login into his account.
      .can create a blog post.
      .can edit a blog post.
      .can delete a blog post.

NORMAL USERS:      
      .can view all blog post.
      .can view a specific blog post.
An admin can view all queries.
An admin can view a specific query.
An admin can delete a specific query.

       .add a comment on a specific blog post.
       .can like a specific blog post.

UI Template 💄
To view the UI click here

API Host 🌐
API endpoints: 

API Documentation 📝
API endpoints Documentation:

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

Endpoint	                  Functionality
POST /api/user/login	      admin log into his account
POST /blogs/	            Admin create a blog post
GET /blogs/	                  retrieve all blog posts
GET /blogs/:blogId	      retrieve a specific blog post
PATCH /blogs/:blogId	      Admin modify a specific blog post
DELETE /blogs/:blogId	      delete a specific blog post
POST /posts/comment/:blogId	add a comment on a specific blog post
POST /posts/likes/:blogId	add a like on a specific blog post
POST /queries/	            create a query
GET /queries/	            Admin retrieve all queries
GET /queries/:id	            Admin retrieve a specific query
DELETE /queries/:id	      Admin delete a specific query
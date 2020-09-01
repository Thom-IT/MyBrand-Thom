//import React, { useState, useCallback } from 'react';
//import axios from 'axios';


//const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ1MTk3NTY4MjI3NjAwMmE1ZjkwN2UiLCJpYXQiOjE1OTg4MTg1NTJ9.iqyVSO24U3KnDNcjCg0XSmgflA6U1wbVzho6RehMG4M';
const apiUrl = 'https://mybrandthomas.herokuapp.com/blogs';

//reading all Blogs from db
axios.get('https://mybrandthomas.herokuapp.com/blogs').then(response => {
    console.log(response.data.blogsData)
    const posts = response.data.blogsData;
    //  posts.map(post => { renderBlog(post) });

    //   '<div><img src=' + response.data.createdBlog.photoUrl + ' width="600" height="300"/><br><h5>' + response.data.createdBlog.title + '</h5><p>' + response.data.createdBlog.description + '</p></div>';
})

function performRequest1() {
    var resultElement = document.getElementById("getResult1");
    resultElement.innerHTML = "";

    axios.get('https://mybrandthomas.herokuapp.com/blogs').then(function(response) {
        resultElement.innerHTML = generateSuccessHTMLOutPut(response);

    }).catch(function(error) {
        resultElement.innerHTML = generateErrorHTMLOutPut(error);
    });
}

function getOneBlog() {
    var resultElement = document.getElementById("getResult2");
    var blogId = document.getElementById("blogId").value;
    resultElement.innerHTML = "";

    axios.get('https://mybrandthomas.herokuapp.com/blogs', {
        params: {
            _id: blogId
        }
    }).then(function(response) {
        resultElement.innerHTML = generateSuccessHTMLOutPut1(response);

    }).catch(function(error) {
        resultElement.innerHTML = generateErrorHTMLOutPut(error);
    });
}

document.getElementById("blogData").addEventListener('submit', createlogPost);

function createlogPost(e) {
    var resultElement = document.getElementById("postResult");
    var btitle = document.getElementById("btitle").value;
    var photoUrl = document.getElementById("photoUrl").value;
    var description = document.getElementById("description").value;
    resultElement.innerHTML = "";

    axios.post(`${apiUrl}`, {
        title: btitle,
        photoUrl: photoUrl,
        description: description
    }, {
        headers: {
            'auth-token': localStorage.getItem('token')
        }
    }).then(function(response) {
        // console.log("this is token " + localStorage.getItem('token'));
        resultElement.innerHTML = generateSuccessHTMLOutPut(response);
    }).catch(function(error) {
        // console.log(error);
        resultElement.innerHTML = generateErrorHTMLOutPut(error);

    });
    e.preventDefault();
}
document.getElementById("blogData").addEventListener('submit', createcomment);

function createcomment(e) {
    var resultElement = document.getElementById("postResult");
    var blogId = document.getElementById("blogId").value;
    var name = document.getElementById("name").value;
    var comment = document.getElementById("comment").value;
    resultElement.innerHTML = "";
    //const blog = await Post.findOne({ _id: req.params.blogId });
    //if (!blog) return res.status(404).send('Blog Not Found');
    // await Post.updateOne({ _id: req.params.blogId }, { $push: { comment: req.body } });

    axios.post(`https://mybrandthomas.herokuapp.com/blogs/comment/${blogId}`, {
        name: name,
        comment: comment
    }).then(function(response) {
        resultElement.innerHTML = generateSuccessHTMLOutPut(response);
    }).catch(function(error) {
        //alert("Error Occurred when commenting to the blog")
        resultElement.innerHTML = generateErrorHTMLOutPut(error);
    })
    e.preventDefault();
}
//=========================
//=============================

// //getting Queries
// axios.get('https://mybrandthomas.herokuapp.com/queries/all', {
//         headers: {
//             'auth-token': `${accessToken}`
//         }
//     }).then(response => {
//         console.log(response.data.queryData)
//             // const posts = response.data.blogsData;
//             // posts.map(post => { renderBlog(post) });
//     })
//     //=================

function clearOutPut() {
    var resultElement = document.getElementById("postResult");
    resultElement.innerHTML = "";
    var resultElement = document.getElementById("getResult1");
    resultElement.innerHTML = "";
    var resultElement = document.getElementById("getResult2");
    resultElement.innerHTML = "";
}


function generateSuccessHTMLOutPut(response) {
    return '<div id="imd"> <div><img src=' + response.data.createdBlog.photoUrl + ' width="600" height="300"/><br><h5>' + response.data.createdBlog.title + '</h5><p>' + response.data.createdBlog.description + '</p><a href=' + response.data.createdBlog.title + '</h5><p><a href=BlogUpdate.html?blogId=' + response.data.createdBlog._id + '&btitle=' + response.data.createdBlog.title + '&photoUrl=' + response.data.createdBlog.photoUrl + '&description=' + response.data.createdBlog.description + '>Edit</a><a href=' + response.data.createdBlog.title + '</h5><p></div></div>';
    // <a href=deleteBlog.html?blogId=' + response.data.createdBlog._id + '>Delete</a>&nbsp;&nbsp;&nbsp;
}

function generateErrorHTMLOutPut(error) {
    return `<p style="color: red;"> ${error.response.data.Message}</p>`;
    // '<p> Message:</p>' +
    //     '<pre>' + JSON.stringify(error.response.data, null, '\t') + '</pre>';
    //'<h4> Result:</h4>' +
    //     '<h5> Message:</h5>' +
    //     '<pre>' + error.message + '</pre>' +
    //     // '<h5> Status:</h5>' +
    //     // '<pre>' + error.response.status + ' ' + error.response.statusText + '</pre>' +
    //     '<h5> Hearders:</h5>' +
    //     '<pre>' + JSON.stringify(error.response.headers, null, '\t') + '</pre>' +
    // '<h5> Message:</h5>' +
    // '<pre>' + JSON.stringify(error.response.data, null, '\t') + '</pre>';
}


// const renderBlog = (post) => {
//     console.log("This is a Blog", post);
// }
// axios.get('https://mybrandthomas.herokuapp.com/blogs').then(response => {
//     console.log(response.data.blogsData)
//     const posts = response.data.blogsData;
//     posts.map(post => { renderBlog(post) });
// })
// axios.get('https://mybrandthomas.herokuapp.com/blogs/5f451a89682276002a5f9080').then(response => {
//     console.log(response.data)
//         // const posts = response.data.blogsData;
//         // posts.map(post => { renderBlog(post) });
// })
// axios.post('https://mybrandthomas.herokuapp.com/queries/', {
//     // name: document.getElementById("userFullName").Value,
//     // email: document.getElementById("userEmail").Value,
//     // query: document.getElementById("userMessage").Value,

//     name: "Mukunzi Thomas",
//     email: "kunma@gmail.com",
//     query: "Hello Sir, This is a nice application once it is complete we will find more customers and we will gain more income from it",
// }).then(response => {
//     console.log(response.data)
//         // const posts = response.data.blogsData;
//         // posts.map(post => { renderBlog(post) });
// })
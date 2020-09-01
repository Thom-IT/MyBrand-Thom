//import React, { useState, useCallback } from 'react';
//import axios from 'axios';


//const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ1MTk3NTY4MjI3NjAwMmE1ZjkwN2UiLCJpYXQiOjE1OTg4MTg1NTJ9.iqyVSO24U3KnDNcjCg0XSmgflA6U1wbVzho6RehMG4M';
const apiUrl = 'https://mybrandthomas.herokuapp.com/blogs';

document.getElementById("blogData").addEventListener('submit', deleteBlog);
const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("blogId");
document.getElementById("blogId").value = blogId;

function deleteBlog(e) {
    var resultElement = document.getElementById("postResult");
    //  var accessToken = document.getElementById("accessToken").value;
    var id = document.getElementById("blogId").value;
    // var name = document.getElementById("name").value;
    // var comment = document.getElementById("comment").value;
    resultElement.innerHTML = "";

    axios.delete(`https://mybrandthomas.herokuapp.com/blogs/${id}`, {
        headers: {
            'auth-token': localStorage.getItem('token')
        }
    }).then(function(response) {
        alert("Successfuly Deleted")
            // resultElement.innerHTML = generateSuccessHTMLOutPut(response);
    }).catch(function(error) {
        //alert("Error when Deleting Blog:" + error.message)
        resultElement.innerHTML = generateErrorHTMLOutPut(error);
    })
    e.preventDefault();
}
//=========================
function clearOutPut() {
    var resultElement = document.getElementById("postResult");
    resultElement.innerHTML = "";
    var resultElement = document.getElementById("getResult1");
    resultElement.innerHTML = "";
    var resultElement = document.getElementById("getResult2");
    resultElement.innerHTML = "";
}


function generateSuccessHTMLOutPut(response) {
    return '<p> Data:</p>' +
        '<pre>' + JSON.stringify(response.data, null, '\t') + '</pre>';
    // '<h4> Result:</h4>' +
    //     '<h5> Status:</h5>' +
    //     '<pre>' + response.status + ' ' + response.statusText + '</pre>' +
    //     '<h5> Hearders:</h5>' +
    //     '<pre>' + JSON.stringify(response.headers, null, '\t') + '</pre>' +
    //     '<h5> Data:</h5>' +
    //     '<pre>' + JSON.stringify(response.data, null, '\t') + '</pre>';
}

function generateErrorHTMLOutPut(error) {
    return `<p style="color: red;"> ${error.response.data.Message}</p>`;
    // '<p> Message:</p>' +
    //     '<pre>' + JSON.stringify(error.response.data, null, '\t') + '</pre>';
}

// '<h4> Result:</h4>' +
//     '<h5> Message:</h5>' +
//     '<pre>' + error.message + '</pre>' +
//     '<h5> Status:</h5>' +
//     '<pre>' + error.response.status + ' ' + error.response.statusText + '</pre>' +
//     '<h5> Hearders:</h5>' +
//     '<pre>' + JSON.stringify(error.response.headers, null, '\t') + '</pre>' +
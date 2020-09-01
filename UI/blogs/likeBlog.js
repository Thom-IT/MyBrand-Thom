//const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ1MTk3NTY4MjI3NjAwMmE1ZjkwN2UiLCJpYXQiOjE1OTg4MTg1NTJ9.iqyVSO24U3KnDNcjCg0XSmgflA6U1wbVzho6RehMG4M';
const apiUrl = 'https://mybrandthomas.herokuapp.com/blogs';

document.getElementById("blogData").addEventListener('submit', likeBlog);
const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("blogId");
document.getElementById("blogId").value = blogId;

function likeBlog(e) {
    var resultElement = document.getElementById("postResult");
    var id = document.getElementById("blogId").value;
    resultElement.innerHTML = "";

    axios.post(`https://mybrandthomas.herokuapp.com/blogs/likes/${id}`).then(function(response) {
        resultElement.innerHTML = generateSuccessHTMLOutPut(response);
    }).catch(function(error) {
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
    return '<h5>' + response.data.message + '</h5>';
}

function generateErrorHTMLOutPut(error) {
    return `<p style="color: red;"> ${error.response.data.Message}</p>`;
    //'<pre>' + JSON.stringify(error.response.data, null, '\t') + '</pre>';
    //'<h5>' + error.response.data.message + '</h5>';
    //'<h4> Result:</h4>' +
    //     '<h5> Message:</h5>' +
    //     '<pre>' + error.message + '</pre>' +
    //     '<h5> Status:</h5>' +
    //     '<pre>' + error.response.status + ' ' + error.response.statusText + '</pre>' +
    //     '<h5> Hearders:</h5>' +
    //     '<pre>' + JSON.stringify(error.response.headers, null, '\t') + '</pre>' +

}
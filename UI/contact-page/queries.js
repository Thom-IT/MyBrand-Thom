function getOneBlog() {
    var resultElement = document.getElementById("getResult2");
    var blogId = document.getElementById("blogId").value;
    resultElement.innerHTML = "";

    axios.get('https://mybrandthomas.herokuapp.com/blogs', {
        params: {
            _id: blogId
        }
    }).then(function(response) {
        resultElement.innerHTML = generateSuccessHTMLOutPut(response);

    }).catch(function(error) {
        window.alert("Error Occurred!!, check well your inputs and try again later")
            //resultElement.innerHTML = generateErrorHTMLOutPut(error);
    });
}

document.getElementById("contactData").addEventListener('submit', createlogPost);

function createlogPost(e) {
    var resultElement = document.getElementById("postResult");
    // var btitle = document.getElementById("btitle").value;
    // var photoUrl = document.getElementById("photoUrl").value;
    // var description = document.getElementById("description").value;
    var name = document.getElementById("userFullName").value;
    var email = document.getElementById("userEmail").value;
    var query = document.getElementById("userMessage").value;
    resultElement.innerHTML = "";

    axios.post('https://mybrandthomas.herokuapp.com/queries', {
        name: name,
        email: email,
        query: query
    }).then(function(response) {
        //resultElement.innerHTML = generateSuccessHTMLOutPut(response);
        alert("Successfully submitted");
    }).catch(function(error) {
        //window.alert("Error Occurred!!, check well your inputs and try again later")
        resultElement.innerHTML = generateErrorHTMLOutPut(error);
    })
    e.preventDefault();
}


//=====================comment=================


function clearOutPut() {
    var resultElement = document.getElementById("postResult");
    resultElement.innerHTML = "";
    var resultElement = document.getElementById("getResult1");
    resultElement.innerHTML = "";
    var resultElement = document.getElementById("getResult2");
    resultElement.innerHTML = "";
}


function generateSuccessHTMLOutPut(response) {
    return '<h6> Message:</h6>' +
        '<pre>' + response.data.createdQuery.name + '</pre>';
}

function generateErrorHTMLOutPut(error) {
    console.log(error.response.data);
    return `<p style="color: red;"> ${error.response.data.Message}</p>`;
    //'<h4> Result:</h4>' +
    //     '<h5> Message:</h5>' +
    //     '<pre>' + error.message + '</pre>' +
    //     '<h5> Status:</h5>' +
    //     '<pre>' + error.response.status + ' ' + error.response.statusText + '</pre>' +
    //     '<h5> Hearders:</h5>' +
    //     '<pre>' + JSON.stringify(error.response.headers, null, '\t') + '</pre>' +
    //     '<h5> Data:</h5>' +

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
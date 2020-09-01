//const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ1MTk3NTY4MjI3NjAwMmE1ZjkwN2UiLCJpYXQiOjE1OTg4MTg1NTJ9.iqyVSO24U3KnDNcjCg0XSmgflA6U1wbVzho6RehMG4M';
const apiUrl = 'https://mybrandthomas.herokuapp.com/blogs';
document.getElementById("blogData").addEventListener('submit', updateBlog);

const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("blogId");
const btitle = urlParams.get("btitle");
const photoUrl = urlParams.get("photoUrl");
const description = urlParams.get("description");
document.getElementById("blogId").value = blogId;
document.getElementById("btitle").value = btitle;
document.getElementById("photoUrl").value = photoUrl;
document.getElementById("description").value = description;

function updateBlog(e) {

    var resultElement = document.getElementById("postResult");
    var blogId = document.getElementById("blogId").value;
    //  var accessToken = document.getElementById("accessToken").value;
    var btitle = document.getElementById("btitle").value;
    var photoUrl = document.getElementById("photoUrl").value;
    var description = document.getElementById("description").value;
    //  alert(accessToken + " " + postId + " " + btitle + " " + photoUrl + " " + description);
    resultElement.innerHTML = "";

    axios.patch(`https://mybrandthomas.herokuapp.com/blogs/${blogId}`, {
        title: btitle,
        photoUrl: photoUrl,
        description: description
    }, {
        headers: {
            'auth-token': localStorage.getItem('token')
        }
    }).then(function(response) {
        window.alert("Successfuly Upddated");
        // console.log(response.data);
        // resultElement.innerHTML = generateSuccessHTMLOutPut(response);
    }).catch(function(error) {
        // window.alert("Error Occurred during Updating " + error);
        //console.log(error);
        resultElement.innerHTML = generateErrorHTMLOutPut(error);

    });
    e.preventDefault();

}
// document.getElementById("blogData").addEventListener('submit', createcomment);

// function createcomment(e) {
//     var resultElement = document.getElementById("postResult");
//     var blogId = document.getElementById("blogId").value;
//     var name = document.getElementById("name").value;
//     var comment = document.getElementById("comment").value;
//     resultElement.innerHTML = "";
//     //const blog = await Post.findOne({ _id: req.params.blogId });
//     //if (!blog) return res.status(404).send('Blog Not Found');
//     // await Post.updateOne({ _id: req.params.blogId }, { $push: { comment: req.body } });

//     axios.post(`https://mybrandthomas.herokuapp.com/blogs/comment/${blogId}`, {
//         name: name,
//         comment: comment
//     }).then(function(response) {
//         resultElement.innerHTML = generateSuccessHTMLOutPut(response);
//     }).catch(function(error) {
//         resultElement.innerHTML = generateErrorHTMLOutPut(error);
//     })
//     e.preventDefault();
// }
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

// function clearOutPut() {
//     var resultElement = document.getElementById("postResult");
//     resultElement.innerHTML = "";
//     var resultElement = document.getElementById("getResult1");
//     resultElement.innerHTML = "";
//     var resultElement = document.getElementById("getResult2");
//     resultElement.innerHTML = "";
// }


function generateSuccessHTMLOutPut(response) {
    return '<p> Result:</p>' +
        '<pre>' + JSON.stringify(response.data, null, '\t') + '</pre>';
    // '<h5> Status:</h5>' +
    // '<pre>' + response.status + ' ' + response.statusText + '</pre>' +
    // '<h5> Hearders:</h5>' +
    // '<pre>' + JSON.stringify(response.headers, null, '\t') + '</pre>' +
    // '<h5> Data:</h5>' +
    // '<pre>' + JSON.stringify(response.data, null, '\t') + '</pre>' +
    //'<div><img src=' + response.data.createdBlog.photoUrl + ' width="600" height="300"/><br><h5>' + response.data.createdBlog.title + '</h5><p>' + response.data.createdBlog.description + '</p></div>';

    // $('<div class="fakeimg " style="height: 500px; width: 800px; "><img src="' + photoUrl + '" width="600" height="300"/><h3>' + btitle + '</h3><p>' + description + '</p></div><input type="text" name="uidd" id="uidd" value="' + uid + '"></input><button type="submit" id="deleteBtn">Click to Delete</button><br><br></div>').appendTo($('#msgDiv'));
}

function generateErrorHTMLOutPut(error) {
    return `<p style="color: red;"> ${error.response.data.Message}</p>`;
    // '<p> Error:</p>' +
    //     '<pre>' + JSON.stringify(error.response.data, null, '\t') + '</pre>';
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
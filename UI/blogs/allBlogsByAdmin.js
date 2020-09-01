//const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ1MTk3NTY4MjI3NjAwMmE1ZjkwN2UiLCJpYXQiOjE1OTg4MTg1NTJ9.iqyVSO24U3KnDNcjCg0XSmgflA6U1wbVzho6RehMG4M';
const apiUrl = 'https://mybrandthomas.herokuapp.com/blogs';


function htmlOutputComment(comment) {
    return `<div style="float: left; background-color: rgb(208, 211, 209); width:600px; height: 150px; border-radius: 20px; border-left: 1px solid #ccc; border-bottom: 1px solid #999; border-right: 1px solid #999; box-shadow: 0 1px 1px #cccccc; margin-left:13px;">
    <p><strong>Names:</strong> ${comment.name}</p>
    <p><strong>comment: </strong>${comment.comment}</p>
    </div>`
}

function htmlOutputlikes(like) {
    return `<div style="float: left; background-color: rgb(208, 211, 209); width:600px; height: 150px; border-radius: 20px; border-left: 1px solid #ccc; border-bottom: 1px solid #999; border-right: 1px solid #999; box-shadow: 0 1px 1px #cccccc; margin-left:13px;">
    <p>${like.likes}</p>
    </div>`
}

// function htmlOutput(post, comments, likes) {
//     return `<div style="float: left; height: auto; border-radius: 20px; border-left: 1px solid #ccc; border-bottom: 1px solid #999; border-right: 1px solid #999; box-shadow: 0 1px 1px #cccccc; margin-left:13px;">
//     <div style="float: left;  width:700px; height: auto; border-radius: 20px; border-left: 1px solid #ccc; border-bottom: 1px solid #999; border-right: 1px solid #999; box-shadow: 0 1px 1px #cccccc; margin-left:13px;" ><div><img src=${post.photoUrl} width="600" height="300"/><br><p><a href=deleteBlog.html?blogId=${post._id}>Delete</a>&nbsp;&nbsp;&nbsp;<a href=BlogUpdate.html?blogId=${post._id}&btitle=${post.title}&photoUrl=${post.photoUrl}&description=${post.description}>Edit</a><p></div>
//     <p>${post.title}</p>
//     <div>${post.description}</div>
//     <div>${comments.map(comment=>htmlOutputComment(comment))}</div>
//     </div></div>`
//         //<div>${likes.map(like=>htmlOutputlikes(like))}</div>
// }

function htmlOutput(post) {
    const div = document.createElement("div");
    const like = document.createElement("a");
    const comment = document.createElement("div");
    const postDetails = document.createElement("div");
    const photo = document.createElement("div");
    comment.innerHTML = `<a href=./BlogUpdate.html?blogId=${post._id}>Update</a>`;
    // photo.innerHTML = `<a href=./get1Blog.html?blogId=${post._id} ><img src=${post.photoUrl} width="600" height="300"/></a>`;
    photo.innerHTML = `<img src=${post.photoUrl} width="600" height="300"/>`;
    postDetails.innerHTML = `<div id="bdy"><p>${post.title}</p>
    <div id="desc">${post.description}</div></div>`
    like.setAttribute("href", "#");
    like.innerHTML = `<i class="fa fa-trash"></i> Trash`;
    div.appendChild(photo);
    div.appendChild(comment) + " " + div.appendChild(like);
    // div.appendChild(like);
    div.appendChild(postDetails);
    like.addEventListener("click", (e) => {
        e.preventDefault();
        axios.delete(`https://mybrandthomas.herokuapp.com/blogs/${post._id}`, {
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        }).then(function(response) {
            alert("Successfuly Deleted")
                // resultElement.innerHTML = generateSuccessHTMLOutPut(response);
        }).catch(function(error) {
            // alert("Error when Deleting Blog:" + error.message)
            resultElement.innerHTML = generateErrorHTMLOutPut(error);
        })
        console.log("liked")
    })
    resultElement.appendChild(div);

}
const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("blogId");
//document.getElementById("blogId").value = blogId;
var resultElement = document.getElementById("getResult1");
//resultElement.innerHTML = "";

axios.get('https://mybrandthomas.herokuapp.com/blogs')
    .then(function(response) {
        response.data.blogsData.map(post => htmlOutput(post, post.comment, post.like));
        console.log(response.data.blogsData);
    }).catch(function(error) {
        console.log(error)
        resultElement.innerHTML = generateErrorHTMLOutPut(error);
    });



// function generateSuccessHTMLOutPut(response) {
//     return '<div><img src=' + response.data.blogsData.photoUrl + ' width="600" height="300"/><br><h5>' + response.data.blogsData.title + '</h5><p>' + response.data.blogsData.description + '</p></div>';
// }


function generateErrorHTMLOutPut(error) {
    return `<p style="color: red;"> ${error.response.data.Message}</p>`;
    // '<h5> Data:</h5>' +
    //     '<pre>' + JSON.stringify(error.response.data, null, '\t') + '</pre>';
    // '<h6> Result:</h6>' +
    //     '<h5> Message:</h5>' +
    //     '<pre>' + error.message + '</pre>' +
    //     '<h5> Status:</h5>' +
    //     '<pre>' + error.response.status + ' ' + error.response.statusText + '</pre>' +
    //     '<h5> Hearders:</h5>' +
    //  '<pre>' + JSON.stringify(error.response.headers, null, '\t') + '</pre>' +

}
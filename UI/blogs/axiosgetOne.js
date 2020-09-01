//coments
document.getElementById("blogData").addEventListener('submit', createcomment);
const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("blogId");
document.getElementById("blogId").value = blogId;

function createcomment(e) {
    var resultElement1 = document.getElementById("getResult1");
    var id = document.getElementById("blogId").value;
    var name = document.getElementById("name").value;
    var comment = document.getElementById("comment").value;
    resultElement.innerHTML = "";

    axios.post(`https://mybrandthomas.herokuapp.com/blogs/comment/${id}`, {
        name: name, //tom=>thomas
        comment: comment
    }).then(function(response) {
        resultElement1.innerHTML = generateSuccessHTMLOutPut1(response);
        //resultElement.innerHTML = generateSuccessHTMLOutPut(response);
        location.reload();
    }).catch(function(error) {

        console.log(error)
            //alert("Error Occurred when commenting the Blog")
        resultElement.innerHTML = generateErrorHTMLOutPut(error);
        //location.reload();
    })
    e.preventDefault();
}

function generateSuccessHTMLOutPut1(response) {
    return '<h5>' + response.data.message + '</h5>';
}

// function generateErrorHTMLOutPut(error) {
//     return '<pre>' + JSON.stringify(error.response.data, null, '\t') + '</pre>';


// }

//end of comments
function htmlOutputComment(comment) {
    return `<div id="output">
    <p><strong>Names:</strong> ${comment.name}</p>
    <div><p><strong>comment: </strong>${comment.comment}</p></div>
    </div>`
}

function htmlOutputlikes(like) {
    return `<div style="float: left; background-color: rgb(208, 211, 209); width:600px; height: 150px; border-radius: 20px; border-left: 1px solid #ccc; border-bottom: 1px solid #999; border-right: 1px solid #999; box-shadow: 0 1px 1px #cccccc; margin-left:13px;">
    <p>${like.likes}</p>
    </div>`
}

function htmlOutput(post, comments, likes) {
    return `<div id="output1">
    <div id="outputimg"><div><img src=${post.photoUrl} width="600" height="300"/><br><p><a href=deleteBlog.html?blogId=${post._id}>Delete</a>&nbsp;&nbsp;&nbsp;<a href=BlogUpdate.html?blogId=${post._id}&btitle=${post.title}&photoUrl=${post.photoUrl}&description=${post.description}>Edit</a><p></div>
    <p>${post.title}</p>
    <div>${post.description}</div>
    <div >${comments.map(comment=>htmlOutputComment(comment))}</div>
    </div></div>`
        //<div>${likes.map(like=>htmlOutputlikes(like))}</div>
}
var resultElement = document.getElementById("getResult1");
axios.get(`https://mybrandthomas.herokuapp.com/blogs/${blogId}`)
    .then(function(response) {
        console.log(response.data.blogs);
        console.log("the Id is :" + blogId)
            //  resultElement.innerHTML = response.data.map(post => htmlOutput(post, post.comment, post.like));
        resultElement.innerHTML = generateSuccessHTMLOutPut(response);
        document.getElementById("blogId").value = blogId;
    }).catch(function(error) {
        // console.log(error)
        // alert("Error Occurred when retreiving the blog")
        resultElement.innerHTML = generateErrorHTMLOutPut(error);
    });

function generateErrorHTMLOutPut(error) {
    return `<p style="color: red;"> ${error.response.data.Message}</p>`;
    // '<h5> Data:</h5>' +
    //     '<pre>' + JSON.stringify(error.response.data, null, '\t') + '</pre>';
}

function generateSuccessHTMLOutPut(response) {
    return `<div><img src=${response.data.blogs.photoUrl} id="fto"/><br><div id="bdy"><h5>${response.data.blogs.title}</h5><p>${response.data.blogs.description}</p></div><br>
    <div id="pht">${response.data.blogs.comment.map(comment=>{
        return `<div id="names">From:<strong> ${comment.name}</strong></div>&nbsp<div id="cmt">Message: ${comment.comment}</div>`
    })}</div>
    <div id="likes"><i style="width:30px; height:20px;" class="fa fa-thumbs-up"></i><strong>${response.data.blogs.likes}</strong></div>
    </div>`
        //'<div><h6>' + response.data + '</h6>';
        // '<pre>' + JSON.stringify(response.data.blogs.comment, null, '\t') + '</pre>' +
        // '<pre> Likes:' + JSON.stringify(response.data.blogs.likes, null, '\t') + '</pre>';

}








// function htmlOutputComment(comment) {
//     return `<div style="float: left; background-color: rgb(208, 211, 209); width:600px; height: 150px; border-radius: 20px; border-left: 1px solid #ccc; border-bottom: 1px solid #999; border-right: 1px solid #999; box-shadow: 0 1px 1px #cccccc; margin-left:13px;">
//     <p><strong>Names:</strong> ${comment.name}</p>
//     <p><strong>comment: </strong>${comment.comment}</p>
//     </div>`
// }

// function htmlOutputlikes(like) {
//     return `<div style="float: left; background-color: rgb(208, 211, 209); width:600px; height: 150px; border-radius: 20px; border-left: 1px solid #ccc; border-bottom: 1px solid #999; border-right: 1px solid #999; box-shadow: 0 1px 1px #cccccc; margin-left:13px;">
//     <p>${like.likes}</p>
//     </div>`
// }

// function htmlOutput(post, comments, likes) {
//     return `<div style="float: left; height: auto; border-radius: 20px; border-left: 1px solid #ccc; border-bottom: 1px solid #999; border-right: 1px solid #999; box-shadow: 0 1px 1px #cccccc; margin-left:13px;">
//     <div style="float: left;  width:700px; height: auto; border-radius: 20px; border-left: 1px solid #ccc; border-bottom: 1px solid #999; border-right: 1px solid #999; box-shadow: 0 1px 1px #cccccc; margin-left:13px;" ><div><img src=${post.photoUrl} width="600" height="300"/><br><p><a href=deleteBlog.html?blogId=${post._id}>Delete</a>&nbsp;&nbsp;&nbsp;<a href=BlogUpdate.html?blogId=${post._id}&btitle=${post.title}&photoUrl=${post.photoUrl}&description=${post.description}>Edit</a><p></div>
//     <p>${post.title}</p>
//     <div>${post.description}</div>
//     <div>${comments.map(comment=>htmlOutputComment(comment))}</div>
//     </div></div>`
//         //<div>${likes.map(like=>htmlOutputlikes(like))}</div>
// }
// const urlParams = new URLSearchParams(window.location.search);
// const blogId = urlParams.get("blogId");
// document.getElementById("blogId").value = blogId;
// var resultElement = document.getElementById("getResult1");
// //resultElement.innerHTML = "";

// axios.get(`https://mybrandthomas.herokuapp.com/blogs/${blogId}`)
//     .then(function(response) {
//         resultElement.innerHTML = response.data.blogs.map(element => {

//         });
//         (post => htmlOutput(post, post.comment, post.like));
//         console.log(response.data.blogs);
//     }).catch(function(error) {
//         console.log(error)
//         resultElement.innerHTML = generateErrorHTMLOutPut(error);
//     });



// // function generateSuccessHTMLOutPut(response) {
// //     return '<div><img src=' + response.data.blogsData.photoUrl + ' width="600" height="300"/><br><h5>' + response.data.blogsData.title + '</h5><p>' + response.data.blogsData.description + '</p></div>';
// // }


// function generateErrorHTMLOutPut(error) {
//     return '<h5> Data:</h5>' +
//         '<pre>' + JSON.stringify(error.response.data, null, '\t') + '</pre>';
//     // '<h6> Result:</h6>' +
//     //     '<h5> Message:</h5>' +
//     //     '<pre>' + error.message + '</pre>' +
//     //     '<h5> Status:</h5>' +
//     //     '<pre>' + error.response.status + ' ' + error.response.statusText + '</pre>' +
//     //     '<h5> Hearders:</h5>' +
//     //  '<pre>' + JSON.stringify(error.response.headers, null, '\t') + '</pre>' +

// }

// // function htmlOutputComment(comment) {
// //     return `<div style="float: left; background-color: rgb(208, 211, 209); width:600px; height: 150px; border-radius: 20px; border-left: 1px solid #ccc; border-bottom: 1px solid #999; border-right: 1px solid #999; box-shadow: 0 1px 1px #cccccc; margin-left:13px;">
// //     <p><strong>Names:</strong> ${comment.name}</p>
// //     <p><strong>comment: </strong>${comment.comment}</p>
// //     </div>`
// // }

// // function htmlOutputlikes(like) {
// //     return `<div style="float: left; background-color: rgb(208, 211, 209); width:600px; height: 150px; border-radius: 20px; border-left: 1px solid #ccc; border-bottom: 1px solid #999; border-right: 1px solid #999; box-shadow: 0 1px 1px #cccccc; margin-left:13px;">
// //     <p>${like.likes}</p>
// //     </div>`
// // }

// // function htmlOutput(post, comments, likes) {
// //     return `<div style="float: left; height: auto; border-radius: 20px; border-left: 1px solid #ccc; border-bottom: 1px solid #999; border-right: 1px solid #999; box-shadow: 0 1px 1px #cccccc; margin-left:13px;">
// //     <div style="float: left;  width:700px; height: auto; border-radius: 20px; border-left: 1px solid #ccc; border-bottom: 1px solid #999; border-right: 1px solid #999; box-shadow: 0 1px 1px #cccccc; margin-left:13px;" ><div><img src=${post.photoUrl} width="600" height="300"/><br><p><a href=deleteBlog.html?blogId=${post._id}>Delete</a>&nbsp;&nbsp;&nbsp;<a href=BlogUpdate.html?blogId=${post._id}&btitle=${post.title}&photoUrl=${post.photoUrl}&description=${post.description}>Edit</a><p></div>
// //     <p>${post.title}</p>
// //     <div>${post.description}</div>
// //     <div>${comments.map(comment=>htmlOutputComment(comment))}</div>
// //     </div></div>`
// //         //<div>${likes.map(like=>htmlOutputlikes(like))}</div>
// // }
// // const urlParams = new URLSearchParams(window.location.search);
// // const blogId = urlParams.get("blogId");
// // document.getElementById("blogId").value = blogId;

// // var resultElement = document.getElementById("getResult2");
// // //resultElement.innerHTML = "";

// // axios.get(`https://mybrandthomas.herokuapp.com/blogs/${blogId}`)
// //     .then(function(response) {
// //         console.log(response.data.blogs);
// //         //  resultElement.innerHTML = response.data.map(post => htmlOutput(post, post.comment, post.like));
// //         resultElement.innerHTML = generateSuccessHTMLOutPut(response);
// //     }).catch(function(error) {
// //         // console.log(error)
// //         resultElement.innerHTML = generateErrorHTMLOutPut(error);
// //     });

// // function generateErrorHTMLOutPut(error) {
// //     return '<h5> Data:</h5>' +
// //         '<pre>' + JSON.stringify(error.response.data, null, '\t') + '</pre>';
// // }

// // function generateSuccessHTMLOutPut(response) {
// //     return '<div><img src=' + response.data.blogs.photoUrl + ' width="600" height="300"/><br><h5>' + response.data.blogs.title + '</h5><p>' + response.data.blogs.description + '</p><br></div>' +
// //         //'<div><h6>' + response.data + '</h6>';
// //         '<pre>' + JSON.stringify(response.data.blogs.comment, null, '\t') + '</pre>' +
// //         '<pre> Likes:' + JSON.stringify(response.data.blogs.likes, null, '\t') + '</pre>';

// // }
//const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ1MTk3NTY4MjI3NjAwMmE1ZjkwN2UiLCJpYXQiOjE1OTg4MTg1NTJ9.iqyVSO24U3KnDNcjCg0XSmgflA6U1wbVzho6RehMG4M';
const apiUrl = 'https://mybrandthomas.herokuapp.com/blogs';
// const urlParams = new URLSearchParams(window.location.search);
// const blogId = urlParams.get("blogId");
// document.getElementById("blogId").value = blogId;

// function like(id) {
//     axios.post(`https://mybrandthomas.herokuapp.com/blogs/likes/${id}`).then(function(response) {
//         alert("thanks for liking the blog");
//     })
// }

function htmlOutput(post) {
    const div = document.createElement("div");
    const like = document.createElement("a");
    const comment = document.createElement("div");
    const postDetails = document.createElement("div");
    const photo = document.createElement("div");
    // comment.innerHTML = `<a href=./comment.html?blogId=${post._id}>comment</a>`;
    photo.innerHTML = `<a href=./get1Blog.html?blogId=${post._id} ><img src=${post.photoUrl} width="600" height="300"/></a>`;
    postDetails.innerHTML = `<p>${post.title}</p>
    <div style="float: left; padding-left:20px; padding-top:20px; width:600px; height: auto; border-radius: 20px; border-left: 1px solid #ccc; border-bottom: 1px solid #999; border-right: 1px solid #999; box-shadow: 0 1px 1px #cccccc; margin-left:13px;">${post.description} </div>`
    like.setAttribute("href", "#");
    like.innerHTML = `<i style="width:100px; height:50px;" class="fa fa-thumbs-up"></i><br><br>`;
    div.appendChild(photo);
    div.appendChild(comment);
    div.appendChild(like);
    div.appendChild(postDetails);


    like.addEventListener("click", (e) => {
        e.preventDefault();
        axios.post(`https://mybrandthomas.herokuapp.com/blogs/likes/${post._id}`).then(function(response) {
            alert("thanks for liking the blog");
        });
        console.log("liked")
    })
    resultElement.appendChild(div);

}
var resultElement = document.getElementById("getResult1");
axios.get('https://mybrandthomas.herokuapp.com/blogs')
    .then(function(response) {
        // response.data.blogsData.forEach(post => htmlOutput(post));
        //resultElement.innerHTML = htmlOutput(response);
        response.data.blogsData.map(post => htmlOutput(post));
        console.log(response.data.blogsData);

    }).catch(function(error) {
        // console.log(error)
        // alert("Error Occurred when retrieving Blogs")
        resultElement.innerHTML = generateErrorHTMLOutPut(error);
    });



// function generateSuccessHTMLOutPut(response) {
//     return '<div><img src=' + response.data.blogsData.photoUrl + ' width="600" height="300"/><br><h5>' + response.data.blogsData.title + '</h5><p>' + response.data.blogsData.description + '</p></div>';
// }


function generateErrorHTMLOutPut(error) {
    return `<p style="color: red;"> ${error.response.data.Message}</p>`;
    // '<h5> Data:</h5>' +
    //     '<pre>' + JSON.stringify(error.response.data, null, '\t') + '</pre>';
}
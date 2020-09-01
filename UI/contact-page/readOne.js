//const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ1MTk3NTY4MjI3NjAwMmE1ZjkwN2UiLCJpYXQiOjE1OTg4MTg1NTJ9.iqyVSO24U3KnDNcjCg0XSmgflA6U1wbVzho6RehMG4M';

const apiUrl = 'https://mybrandthomas.herokuapp.com/queries';
let qryid;


function htmlOutput(post) {
    return `<div style="float: left; width:700px; height: 150px; border-radius: 20px; border-left: 1px solid #ccc; border-bottom: 1px solid #999; border-right: 1px solid #999; box-shadow: 0 1px 1px #cccccc; margin-left:13px;">
    <h5>Nmes: ${post.name}</5>
    <h5>Email: ${post.email}</5>
    <div>Message: ${post.query}</div>
    </div>`
}

function getOne() {
    var resultElement = document.getElementById("getResult2");
    qryid = document.getElementById("qryId").value;
    resultElement.innerHTML = "";

    axios.get(`https://mybrandthomas.herokuapp.com/queries/${qryid}`, {
        headers: {
            'auth-token': localStorage.getItem('token')
        }
    }).then(function(response) {
        resultElement.innerHTML = generateSuccessHTMLOutPut(response);

    }).catch(function(error) {
        // window.alert("Error Occurred!!, check well your inputs and try again later")
        resultElement.innerHTML = generateErrorHTMLOutPut(error);
    });
}

function generateSuccessHTMLOutPut(response) {
    return '<div><h5>From: ' + response.data.blogs.name + '</h5><p>Email: ' + response.data.blogs.email + '</p><p>Query/Message' + response.data.blogs.query + '</p></div>';

    // $('<div class="fakeimg " style="height: 500px; width: 800px; "><img src="' + photoUrl + '" width="600" height="300"/><h3>' + btitle + '</h3><p>' + description + '</p></div><input type="text" name="uidd" id="uidd" value="' + uid + '"></input><button type="submit" id="deleteBtn">Click to Delete</button><br><br></div>').appendTo($('#msgDiv'));
}

function generateErrorHTMLOutPut(error) {
    console.log(error);
    return `<p style="color: red;"> ${error.response.data.Message}</p>`;
}
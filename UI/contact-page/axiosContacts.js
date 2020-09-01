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
var resultElement = document.getElementById("getResult1");
//const accessToken = document.getElementById('accessToken').value;
resultElement.innerHTML = "";

axios.get('https://mybrandthomas.herokuapp.com/queries/all', {
    headers: {
        'auth-token': localStorage.getItem('token')
    }
}).then(function(response) {
    resultElement.innerHTML = response.data.queryData.map(post => htmlOutput(post));

}).catch(function(error) {
    //window.alert("Error Occurred!!, Please check well your inputs")
    resultElement.innerHTML = generateErrorHTMLOutPut(error);
});


function getOne() {
    var resultElement = document.getElementById("getResult2");
    //const accessToken = document.getElementById('accessToken').value;
    qryid = document.getElementById("qryId").value;
    // qryid = "5f468b6deed98a002a3c2522";
    //console.log("id is :" + qryid);
    resultElement.innerHTML = "";

    axios.get(`https://mybrandthomas.herokuapp.com/queries/${qryid}`, {
        headers: {
            'auth-token': localStorage.getItem('token')
        }
    }).then(function(response) {
        resultElement.innerHTML = generateSuccessHTMLOutPut(response);

    }).catch(function(error) {
        //window.alert("Error Occurred!!, recheck and try again later")
        resultElement.innerHTML = generateErrorHTMLOutPut(error);
    });
}

//document.getElementById("contactData").addEventListener('submit', createlogPost);

function createQuery(e) {
    var resultElement = document.getElementById("queryResult");
    var names = document.getElementById("userFullName").value;
    var email = document.getElementById("userEmail").value;
    var query = document.getElementById("userMessage").value;
    resultElement.innerHTML = "";

    axios.post(`${apiUrl}`, {
        names: names,
        email: email,
        query: query
    }).then(function(response) {
        resultElement.innerHTML = generateSuccessHTMLOutPut(response);
    }).catch(function(error) {
        // console.log(error);
        // window.alert("Error Occurred!!, check well your inputs and try again later")
        resultElement.innerHTML = generateErrorHTMLOutPut(error);

    });
    e.preventDefault();
}

function clearOutPut() {
    var resultElement = document.getElementById("queryResult");
    resultElement.innerHTML = "";
    var resultElement = document.getElementById("getResult1");
    resultElement.innerHTML = "";
    var resultElement = document.getElementById("getResult2");
    resultElement.innerHTML = "";
}


function generateSuccessHTMLOutPut(response) {
    return '<pre>' + JSON.stringify(response.data, null, '\t') + '</pre>';

    // '<h4> Result:</h4>' +
    //     '<h5> Status:</h5>' +
    //     '<pre>' + response.status + ' ' + response.statusText + '</pre>' +
    //     '<h5> Hearders:</h5>' +
    //     '<pre>' + JSON.stringify(response.headers, null, '\t') + '</pre>' +

}

function generateErrorHTMLOutPut(error) {
    return `<p style="color: red;"> ${error.response.data.Message}</p>`;
    // '<p> Message:</p>' +
    //     '<pre>' + JSON.stringify(error.response.data, null, '\t') + '</pre>';
    // '<h4> Result:</h4>' +
    //     '<h5> Message:</h5>' +
    //     '<pre>' + error.message + '</pre>' +
    //     '<h5> Status:</h5>' +
    //     '<pre>' + error.response.status + ' ' + error.response.statusText + '</pre>' +
    //     '<h5> Hearders:</h5>' +
    //     '<pre>' + JSON.stringify(error.response.headers, null, '\t') + '</pre>' +

}
document.getElementById("login_div").style.display = "block";
document.getElementById("welcome_login_div").style.display = "none";

function login() {
    var email = document.getElementById("userEmail").value;
    var password = document.getElementById("password").value;
    var resultElement = document.getElementById("getResult1");
    axios.post("https://mybrandthomas.herokuapp.com/api/user/login", {
            email: email,
            password: password
        })
        .then((docs) => {
            document.getElementById("login_div").style.display = "none";
            document.getElementById("welcome_login_div").style.display = "block";
            let token = docs.data.token;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["auth-token"] = token;
            console.log(token);
            // console.log(docs.data)
            // alert("Welcome to my-Brand-Thom Application");
        })
        .catch(function(error) {
            alert("Username or password is not valid " + error);
            // resultElement.innerHTML = generateErrorHTMLOutPut(error);
        })
}

function generateErrorHTMLOutPut(error) {
    return `<p style="color: red;"> ${error.response.data.message}</p>`;
    // '<h5> Data:</h5>' +
    //     '<pre>' + JSON.stringify(error.response.data, null, '\t') + '</pre>';
}

// function logout() {
//     axios.post('')
//         .then((response => {
//                 document.getElementById("login_div").style.display = "block";
//                 document.getElementById("welcome_login_div").style.display = "none";
//             })
//             // firebase.auth().signOut();
//             //document.getElementById("loggedInUser").innerHTML = "Now you have logged Out from the System !!!!!!!!!!!!!";
//         }

// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//         // User is signed in.
//         document.getElementById("login_div").style.display = "none";
//         document.getElementById("welcome_login_div").style.display = "block";
//         var user = firebase.auth().currentUser;

//         if (user != null) {
//             // User is signed in.
//             var email_id = user.email;
//             document.getElementById("userInfos").innerHTML = "Dear " + email_id + " Welcome to My Brand Thomas Aplication"

//         } else {
//             // No user is signed in.
//         }

//     } else {
//         // No user is signed in.
//         document.getElementById("login_div").style.display = "block";
//         document.getElementById("welcome_login_div").style.display = "none";
//     }
// });

// function login() {
//     var email = document.getElementById("username").value;
//     var password = document.getElementById("pwd").value;

//     firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // ...
//         window.alert("Error: " + errorMessage);
//     });
// }

// function logout() {
//     firebase.auth().signOut();
//     //document.getElementById("loggedInUser").innerHTML = "Now you have logged Out from the System !!!!!!!!!!!!!";
// }
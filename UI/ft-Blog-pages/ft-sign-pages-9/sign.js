firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        document.getElementById("container").style.display = "none";
        document.getElementById("container0").style.display = "block";
        var user = firebase.auth().currentUser;
        if (user != null) {
            var Uid = user.Uid;
            var email = user.email;
            var pwd = user.passwrd;
            window.location.href = "testPage.html";
            document.getElementById("loggedInUser").innerHTML = "Hello " + email + " your Uid is " + Uid + " We welcome you to our Platform";

        }
    } else {
        // No user is signed in.
        document.getElementById("container").style.display = "block";
        document.getElementById("container0").style.display = "none";
    }
});

function login() {
    var username = document.getElementById("username").value;
    var passwrd = document.getElementById("pwd").value;
    // alert(passwrd);
    firebase.auth().signInWithEmailAndPassword(username, passwrd).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorMessage);
        console.log(errorCode);

        window.alert("error :" + errorMessage);
    });

}

function logout() {
    firebase.auth().signOut();
    document.getElementById("loggedInUser").innerHTML = "Now you have logged Out from the System !!!!!!!!!!!!!";
}
//=======================registering==========================================================
var firestore = firebase.firestore();

const submitBtn = document.querySelector("#signup-btn");
let name = document.querySelector("#name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let password2 = document.querySelector("#password2");
let agreement = document.querySelector("#remember");

const db = firestore.collection("signData");
submitBtn.addEventListener('click', function() {
    let userNameInput = name.value;
    let userEmailInput = email.value;
    let userPasswordInput = password.value;
    let userPassword2Input = password2.value;
    let agreementInput = agreement.value;
    //window.alert(userNameInput);
    db.doc().set({
        name: userNameInput,
        email: userEmailInput,
        password: userPasswordInput,
        agrement: agreementInput,
    }).then(function() {
        //console.log("Data Saved !!!!!!!!!!!!!")
        window.alert("Data With the Name " + userNameInput + " is well Registerd");
    }).catch(function() {
        //console.log(error);
        window.alert(" Error Message :" + error);
    })
})

//===============================Data Retreive from Database===================

var ref = database.ref('signData');
ref.on('value', gotData, errorData);

function gotData(data) {
    var signData = data.val();
    var keys = Object.keys(signData);
    console.log(keys);
    // console.log(keys);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        //var Fname = signData[k].Fname;
        //var message = signData[k].message;
        var names = signData[k].name;
        // var email = contactData[k].email;
        // var pwd = contactData[k].password;
        //console.log(names, email, pwd);
        console.log(Fname, message);
    }

}

function errorData(error) {
    console.log('error');
    console.log(error);
}
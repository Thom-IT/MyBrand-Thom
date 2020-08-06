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
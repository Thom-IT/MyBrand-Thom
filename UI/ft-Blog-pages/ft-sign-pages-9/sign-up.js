const names = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const addBtn = document.getElementById("signup-btn");
const updateBtn = document.getElementById("update-btn");
const deleteBtn = document.getElementById("delete-btn");
var usersData = document.getElementById("users");
const userForm = document.getElementById("userForm");

//======================Registering===========================
database = firebase.database();
const rootRef = database.ref("users");
addBtn.addEventListener("click", function() {
        const autId = rootRef.push().key;
        // rootRef.child(names.value).set({
        rootRef.child(autId).set({
            uid: autId,
            names: names.value,
            email: email.value,
            password: password.value

        }).then(function() {
            window.alert("Data With the Name " + email.value + " is well Registerd");
            document.getElementById("userForm").reset();
        }).catch(function() {
            window.alert(" Error Message :" + error);
        })
    })
    //==================Updating=======================
updateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const newData = {
        Amazina: names.value,
        EmailAdress: email.value,
        UserPassword: password.value
    };
    rootRef.child(names.value).update(newData);
});
//=========================DELETE===================
deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    rootRef.child(names.value).remove()
        .then(() => {
            // database.ref("super-Users").child(names.value).remove();
            window.alert(" The User with :" + names.value + " is deleted");
        })
        .catch(error => {
            window.alert(" Error when Deleting the User :" + names.value + " (" + error + " )");
        })
});
/*
//"child_added", "child_removed", "child_changed", or "child_moved".
rootRef.child(0).on("child_added", snapchat => {
    // console.log("child(s) added !!!");
    console.log(snapchat.val());
});
rootRef.orderByChild("names").equalTo("Kigali Rwanda").on("value", snapchat => {
    // console.log("child(s) added !!!");
    console.log(snapchat.val());
});

database.ref("/users").orderByValue().on("value", snapchat => {
    // console.log("child(s) added !!!");
    //console.log(snapchat.val());
    var names = snapchat.val().value;
    var email = snapchat.val().email;
    var password = snapchat.val().password;
    // console.log(names);

    //  document.getElementById("uidS").innerHTML = uid;
    // document.getElementById("nameSS").innerHTML = names;
    // document.getElementById("emailSS").innerHTML = email;
    // document.getElementById("passwordSS").innerHTML = password;
});


function getData() {
    var uid = document.getElementById("users").value;

    firebase.database().ref('users/' + uid).once('value').then(function(snapshot) {
        var uid = snapshot.val().uid;
        var names = snapshot.val().names;
        var email = snapshot.val().email;
        var password = snapshot.val().password;
        //  alert(uid);
        //console.log(email);
        document.getElementById("uid").innerHTML = uid;
        document.getElementById("nameS").innerHTML = names;
        document.getElementById("emailS").innerHTML = email;
        document.getElementById("passwordS").innerHTML = password;
    })
}

function getAll() {

    firebase.database().ref('users/').once('value').then(function(snapshot) {
        var uid = snapshot.val().uid;
        var names = snapshot.val().names;
        var email = snapshot.val().email;
        var password = snapshot.val().password;
        // console.log(snapshot.val().names);
        //  console.log(snapshot.names);
        document.getElementById("uidS").innerHTML = uid;
        document.getElementById("nameSS").innerHTML = names;
        document.getElementById("emailSS").innerHTML = email;
        document.getElementById("passwordSS").innerHTML = password;
    })
}
*/
//=================TESTING DISPLAY===========================
/*var valuesInput = firebaseRef = firebase.database().ref().child("kiki");
valuesInput.on("value", function(dataspashot) {
    usersData.innerText = dataspashot.val();
});
//===============================Data Retreive from Database===================

var ref = database.ref('users');
ref.on('value', gotData, errorData);

function gotData(data) {
    var users = data.val();
    var keys = Object.keys(users);
    console.log(keys);
    // console.log(keys);
    for (var i = 0; i < keys.length; i++) {
        var AllData = []
        var k = keys[i];
        var names = users[k].name;
        var email = users[k].email;
        var pwd = users[k].password;
        //console.log(names, email, pwd);
        var t = names + " " + email + " " + pwd;
        console.log(t);
        AllData.push(t);
    }

}

function errorData(error) {
    console.log('error');
    console.log(error);
}
*/
var ref = firebase.database().ref();

ref.on("value", function(snapshot) {
    console.log(snapshot.val());
}, function(error) {
    console.log("Error: " + error.code);
});

//================All============
var usersRef = firebase.database().ref("users/");

usersRef.on("child_added", function(data, prevChildKey) {
    var users = data.val();

    console.log("uId: " + users.uid);
    console.log("Names: " + users.names);
    console.log("Email: " + users.email);
    console.log("Password: " + users.password);
    console.log("Previous UserId: " + prevChildKey);

    //$("#uid").append(uid);
    // $("#descriptions").append(description);
    //$("#title").append(Title);
    // $("#photoUrl").append(photoUrl);
    // var li = createElement('li', uid + ': ' + description + ' : ' + Title)
    //li.parent('allData')
    $('<div class="fakeimg " style="height: 200px; width: 400px;margin-left:400px; border: 5px outset black;background-color: rgb(167, 156, 156);text-align: center; "><p>User ID:' + users.uid + '</p><p>Password:' + users.password + '</p><p>User Email' + users.email + '</p><p>User Names: ' + users.names + '<button type="submit" value=' + users.uid + ' id="deleteBtn">DELETE</button></p><br><br><br><br><br><br><br><br>').appendTo($('#msgDiv'));
    //window.location.href = "admin.html";

});


const list_div = document.querySelector("#list_div");
var db = firebase.firestore();
db.collection("users").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            list_div.innerHTML += '<div class="list_item"><h3>' + doc.data().email.push + '</h3></div>'
                // doc.data() is never undefined for query doc snapshots
            console.log(" Names=> ", doc.data().val());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

//========================================================================
//==========================For Login Part============================================
//===================================================================
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
            // window.location.href = "../CreateBlog.html";
            // document.getElementById("loggedInUser").innerHTML = "Hello " + email + " your Uid is " + Uid + " We welcome you to our Platform";
        }
    } else {
        // No user is signed in.
        document.getElementById("container").style.display = "block";
        document.getElementById("container0").style.display = "none";
    }
});
/*
function login() {
    var username = document.getElementById("username").value;
    var passwrd = document.getElementById("pwd").value;
    // alert(passwrd);
    firebase.auth().signInWithEmailAndPassword(username, passwrd).catch(function(error) {
            // Handle Errors here.


            window.location.href = "signup.html";


            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorMessage);
            console.log(errorCode);

            window.alert("error :" + errorMessage);
        })
        .catch(function(error) {
            window.location.href = "signup.html";
            document.getElementById("validation").innerText = "Please provide username and password";
        });

}*/
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("pwd").value;
    const form = document.getElementById('form');
    const errorElement = document.getElementById('error');
    form.addEventListener('submit', (e) => {
        var messages = []
        firebase.auth().onAuthStateChanged(function(user) {
            // User is signed in.
            //messages.push('Thanks for Loging into our system');
            if (username === "" || username == null) {
                // No user is signed in.
                messages.push('Please write a correct Email');
            } else if (user.email == username) {
                messages.push('Well Done');
                window.location.href = "../CreateBlog.html";
            }
            if (password.length < 3 || password.length > 20) {
                messages.push('The Password should be between 3 and 20 charactors')
            } else {
                messages.push('Well Done!!!');
                document.getElementById("d").innerText = " Welcome " + user.email;
                window.location.href = "../CreateBlog.html";

            }
            if (messages.length > 0) {
                e.preventDefault()
                errorElement.innerText = messages.join(',')
            } else {
                messages.push('Byose byakozwe neza');
            }

        });


    })
}

function logout() {
    firebase.auth().signOut();
    document.getElementById("loggedInUser").innerHTML = "Now you have logged Out from the System !!!!!!!!!!!!!";
}
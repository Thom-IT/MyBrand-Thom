var btitle = document.getElementById("btitle");
var photoUrl = document.getElementById("photoUrl");
var description = document.getElementById("description");
var postBton = document.getElementById("postBton");

database = firebase.database();
const rootRef = database.ref("blogData");
postBton.addEventListener("click", function() {
    const autId = rootRef.push().key;
    rootRef.child(autId).set({
        uid: autId,
        Title: btitle.value,
        photoUrl: photoUrl.value,
        Description: description.value
    }).then(function() {
        window.alert("The Blog Post is Well Registered");
        document.getElementById("blogData").reset();
    }).catch(function() {
        window.alert(" Error Message :" + error);
    })
})

var userDataRef = firebase.database().ref("blogData").orderByKey();
userDataRef.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        var description = childData.Description;
        var Title = childData.Title;
        var photoUrl = childData.photoUrl;
        var uid = childData.uid;
        //document.getElementById("uid").innerHTML = uid;
        //console.log(childData.Description);
        //console.log(childData.photoUrl);
        console.log(childData);

        $("#uid").append(uid);
        $("#descriptions").append(description);
        $("#title").append(Title);
        // $("#photoUrl").append(photoUrl);
        // var li = createElement('li', uid + ': ' + description + ' : ' + Title)
        //li.parent('allData')
        $('<div class="fakeimg " style="height: 500px; width: 800px; "><img src="' + photoUrl + '" width="600" height="300"/><h3>' + Title + '</h3><p>' + description + '</p><br><br><br><br><br><br><br><br></div><br></div>').appendTo($('#msgDiv'));
        //window.location.href = "admin.html";

    });
});

//const updateBtn = document.getElementById("update-btn");
const deleteBtn = document.getElementById("deleteBtn");
/*//==================Updating=======================
updateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const newData = {
        Amazina: names.value,
        EmailAdress: email.value,
        UserPassword: password.value
    };
    rootRef.child(names.value).update(newData);
});
*/
//=========================DELETE===================
deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    var uid = document.getElementById("uidd");
    rootRef.child(uid.value).remove()

    .then(() => {
            window.alert(" The post is deleted");
        })
        .catch(error => {
            window.alert(" Error when Deleting the the blog" + error);
        })
});
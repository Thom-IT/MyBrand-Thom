database = firebase.database();
var userDataRef = firebase.database().ref("blogData").orderByKey();
userDataRef.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        var description = childData.Description;
        var Title = childData.Title;
        var photoUrl = childData.photoUrl;
        var uid = childData.uid;
        console.log(childData);

        $("#uid").append(uid);
        $("#descriptions").append(description);
        $("#title").append(Title);
        // $('<div class="card " style="height: 150px; width: 200px; "><img src="' + photoUrl + '" width="180" height="130"/><h3>' + Title + '</h3><p>' + description + '</p><br><br><br><br><br><br><br><br></div><br></div>').appendTo($('#msgDiv'));
        $('<div class="card " style="height: 320px; width: 240px; "><img src="' + photoUrl + '" width="220" height="300"/></div>').appendTo($('#msgDiv'));
        //window.location.href = "admin.html";
        $('<h4 class="title mb-1 " style="height: 50px; width: 900px; padding-left: 500px;">' + Title + '</h4><p style="padding-left: 250px;">' + description + '</p>').appendTo($('#titleH'));
        //window.location.href = "admin.html";
        //$('<div class="intro " style="height: 150px; width: 600px; "><p>' + description + '</p></div>').appendTo($('#desc'));
        //window.location.href = "admin.html";

    });
});
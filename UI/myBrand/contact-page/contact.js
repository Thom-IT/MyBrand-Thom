 const names = document.getElementById("userFullName");
 const email = document.getElementById("userEmail");
 const message = document.getElementById("userMessage");
 const sendBtn = document.getElementById("sendBtn");
 const uidS = document.getElementById("uidS");
 const contactForm = document.getElementById("contactForm");
 const nameSS = document.getElementById("nameSS");
 const emailSS = document.getElementById("emailSS");
 const messages = document.getElementById("messages");
 var allData = document.getElementById("allData");
 var booleans = true;
 database = firebase.database();
 const rootRef = database.ref("contact");
 sendBtn.addEventListener("click", function() {
     const autId = rootRef.push().key;
     rootRef.child(autId).set({
         uid: autId,
         names: names.value,
         email: email.value,
         Message: message.value

     }).then(function() {
         //console.log("Data Saved !!!!!!!!!!!!!")
         window.alert("the message from :" + email.value + " is sent");
         document.getElementById("contactForm").reset();
     }).catch(function() {
         //console.log(error);
         window.alert(" Error Message :" + error);
     })
 })

 /*//================All============
 var usersRef = firebase.database().ref("contact/");

 usersRef.on("child_added", function(data, prevChildKey) {
     var users = data.val();

     console.log("uId: " + user.uid);
     console.log("Names: " + user.names);
     console.log("Email: " + user.email);
     console.log("Message: " + user.Message);


     //console.log(users)
     //console.log("Previous UserId: " + prevChildKey);


      //======Display===
     document.getElementById("uidS").innerHTML = users.uid;
     document.getElementById("nameSS").innerHTML = users.names;
     document.getElementById("emailSS").innerHTML = users.email;
     document.getElementById("messages").innerHTML = users.Message;
     //document.getElementById("prevChildKey").innerHTML = prevChildKey;


 });
 */
 fetch('https://mybrand-thom.firebaseio.com/contact.json')
     .then((response) => response.json())
     .then((response) => {
         for (var element in response) {
             var oneElement = response[element];
             document.getElementById("uidS").innerHTML = oneElement.uid;
             document.getElementById("nameSS").innerHTML = oneElement.names;
             document.getElementById("emailSS").innerHTML = oneElement.email;
             document.getElementById("messages").innerHTML = oneElement.Message;
         }
     });
 var renderData = (element) => {

     }
     /*// Your web app's Firebase configuration
     var firebaseConfig = {
         apiKey: "AIzaSyCqZFcy_HXDV7Y3UOHKL5gboce1IFtMHFg",
         authDomain: "mybrand-thom.firebaseapp.com",
         databaseURL: "https://mybrand-thom.firebaseio.com",
         projectId: "mybrand-thom",
         storageBucket: "mybrand-thom.appspot.com",
         messagingSenderId: "723580696020",
         appId: "1:723580696020:web:c771913b5e4e76113d5241",
         measurementId: "G-PXDF6D3L1K"
     };
     // Initialize Firebase
     firebase.initializeApp(firebaseConfig);
     var firestore = firebase.firestore();

     const submitBtn = document.querySelector("#submit");
     let name = document.querySelector("#userFullName");
     let userEmail = document.querySelector("#userEmail");
     let userMessage = document.querySelector("#userMessage");

     const db = firestore.collection("contactData");
     submitBtn.addEventListener('click', function() {
         let userNameInput = name.value;
         let userEmailInput = userEmail.value;
         let userMessageInput = userMessage.value;
         db.doc().set({
             name: userNameInput,
             email: userEmailInput,
             message: userMessageInput,
         }).then(function() {
             //console.log("Data Saved !!!!!!!!!!!!!")
             window.alert("Your Email is Sent");
         }).catch(function() {
             //console.log(error);
             window.alert(" Error Message :" + error);
         })

         /*  ref.on("value", function(snapshot) {
               snapshot.forEach(function(childSnapshot) {
                   var data = childSnapshot.val();
                   console.log(data)
               });
           })*/
     /*
     })

     //=====================Retrive Data================
     database = firebase.database();
     var ref = database.ref('contactData');
     ref.on('value', gotData, errData);

     function gotData(data) {
         var scoreSetting = selectAll('.scoreListing');
         for (var i = 0; i < scorelist.length; i++) {
             scoreListing[i].remove();
         }
         //console.log(data.val());
         var contactData = data.val();
         var keys = Object.keys(contactData);
         for (var i = 0; i < keys.length; i++) {

             var k = keys[i];
             var initials = contactData[k].initials;
             var fname = contactData[k].Fname;
             console.log(initials, fname);
             //console.log(k);
             //console.log(fname);
             li.class('fnaming')
             var li = createElement('li', k + ': ' + fname);
             li.class('scoreListing');
             li.parent('scorelist');
         }

     }

     function errData(err) {
         console.log('error!');
         console.log(err);
     }
     */
$(document).ready(function(){

   // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAcjHtLeWhqqbpcDeRWuODK8po2Qh9IDwI",
    authDomain: "project1-806c5.firebaseapp.com",
    databaseURL: "https://project1-806c5.firebaseio.com",
    projectId: "project1-806c5",
    storageBucket: "project1-806c5.appspot.com",
    messagingSenderId: "437558646660"
  };
  firebase.initializeApp(config);

  var database= firebase.database();

   var name = "";
   var destination = "";
   var trainTime = "";
   var frequency = "";


  // 2. Button for adding Trains
  $("#add-Train").on("click", function(){

    event.preventDefault();

    // Grabs user input and assign to variables
    var trainName = $("#name-Input").val().trim();
    var destination = $("#destination-Input").val().trim();
    var timeInput = moment($("#time-Input").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequencyInput = $("#frequency-Input").val().trim();

    // Test for variables entered
    console.log(trainName);
    console.log(destination);
    console.log(timeInput);
    console.log(frequencyInput);

    database.ref().push({
    name:  trainName,
    destination: destination,
    trainTime: timeInput,
    frequency: frequencyInput,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    // clear text-boxes
    $("#name-Input").val("");
    $("#destination-Input").val("");
    $("#time-Input").val("");
    $("#frequency-Input").val("");
    // Prevents page from refreshing
    return false;

});


  database.ref().on("child_added", function(snapshot){

    // assign firebase variables to snapshots.
    name = snapshot.val().name;
    destination = snapshot.val().destination;
    timeInput = snapshot.val().trainTime;
    frequency = snapshot.val().frequency;

    var diffTime = moment().diff(moment.unix(timeInput), "minutes");
    var timeRemainder = moment().diff(moment.unix(timeInput), "minutes") % frequency;
    var minutes = frequency - timeRemainder;

    var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

    // Test for correct times and info
    console.log(minutes);
    console.log(nextTrainArrival);
    console.log(moment().format("hh:mm A"));
    console.log(nextTrainArrival);
    console.log(moment().format("X"));

    // Append train info to table on page
    $(".table").find("tbody").append("<tr><td>"
      + name + "</td><td>" + destination + "</td><td>" + frequency + " mins" + "</td><td>"
      + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
  });


});
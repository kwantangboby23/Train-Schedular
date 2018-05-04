 
 $(document).ready(function(){ 
 
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyCBYxenjUTMTzBLSGz7jPWA_z4whDQxPKY",
    authDomain: "trainschedule-49eaf.firebaseapp.com",
    databaseURL: "https://trainschedule-49eaf.firebaseio.com",
    projectId: "trainschedule-49eaf",
    storageBucket: "trainschedule-49eaf.appspot.com",
    messagingSenderId: "237933907343"
  };
  firebase.initializeApp(config);

  var database = firebase.database();;
// Set-up initial variable
  var trainName = "";
  var destiNation = "";
  var freQuency = "";
  var nextArrival = "";
  var minutesAway = "";

// Set-up military time 
    $("#firsttraintime").timepicker({
        timeFormat: "HH:mm"
        
    });

// button for saving train data, and add train data
  
    $("#addtrain").on("click",function(event){

        // Cancel the default aciton of the click
        event.preventDefault();

        trainName = $("#trainname").val().trim();
        destiNation = $("#destination").val().trim();
        firstTrainTime = $("#firsttraintime").val().trim();
        freQuency = $("#frequency").val().trim();

        var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
        console.log(firstTrainTime);

        var currentTime = moment();
        console.log(currentTime);
        
        var diffTime = moment().diff(moment(firstTimeConverted),"minutes");
        console.log(diffTime);

        var remainder = diffTime % freQuency;
        console.log(remainder);

        minutesAway = freQuency - remainder;
        console.log(minutesAway);

        nextArrival = moment().add(minutesAway, "minutes");
        console.log(nextArrival);

        var tnextArrival = moment(nextArrival).format("HH:mm");
        



        // Sava train data in firebase
        database.ref().push({
            trainName : trainName,
            destiNation : destiNation,
            firstTrainTime : firstTrainTime,
            freQuency : freQuency,
            nextArrival : tnextArrival,
            minutesAway: minutesAway,
            dateAdded: firebase.database.ServerValue.TIMESTAMP

        });

        console.log(trainName);
        console.log(destiNation);
        console.log(firstTrainTime);
        console.log(freQuency);

        // $("#trainname").val("");
        // $("#destination").val("");
        // $("#firsttraintime").val("");
        // $("#frequency").val("");
    });

//  Add Train schedule 

    database.ref().on("child_added", function(snap, prevChildKey){

        // Assign firebase variables to snap
        var trainnameSnap = snap.val().trainName;
        var destinationSnap = snap.val().destiNation;
        var frequencySnap = snap.val().freQuency;
        var nextarrivalSnap = snap.val().nextArrival;
        var minutesawaySnap = snap.val().minutesAway;

        $("#tablebody").append("<tr><td>" + trainnameSnap + "</td><td>" + destinationSnap + "</td><td>" + frequencySnap + "</td><td>" + nextarrivalSnap + "</td><td>" + minutesawaySnap + "</td></tr>");

    });

});
const firebaseConfig = {
    apiKey: "AIzaSyCaccr-PTPUKM8ohFgYsbM9aDmP2ffafmc",
    authDomain: "health-monitoring-ad75d.firebaseapp.com",
    projectId: "health-monitoring-ad75d",
    storageBucket: "health-monitoring-ad75d.appspot.com",
    messagingSenderId: "424960953670",
    appId: "1:424960953670:web:563639c4f44f59f0e9e947",
    measurementId: "G-0VS5DNPEWY"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const auth = firebase.auth();
  const database = firebase.database();

function logout() {
    firebase.auth().signOut().then(function () {
        window.location.href = 'index.html';
    }).catch(function (error) {
        window.location.href = 'index.html';
    });
}

document.addEventListener("DOMContentLoaded", function () {
  auth.onAuthStateChanged(function (user) {
      if (user) {
          displayTableData();
      } else {
          console.log("No user is currently authenticated.");
          window.location.href = 'index.html';
      }
  });
});

function displayTableData() {
    var tableBody = document.querySelector("tbody");
    var patientsRef = database.ref("HealthRecord");

    patientsRef.once("value")
        .then(function (snapshot) {
          console.log("Data fetched successfully:", snapshot.val());
            tableBody.innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                var patientData = childSnapshot.val();
                var row = tableBody.insertRow();

                var cellNumber = row.insertCell(0);
                var cellFullName = row.insertCell(1);
                var cellResultDate = row.insertCell(2);
                var cellAge = row.insertCell(3);
                var cellGender = row.insertCell(4);
                var cellBMI = row.insertCell(5);
                var cellBloodPressure = row.insertCell(6);
                var cellHeartRate = row.insertCell(7);
                var cellExercise = row.insertCell(8);

                cellNumber.textContent = patientData.id;
                cellFullName.textContent = patientData.fullname;
                cellResultDate.textContent = patientData.date;
                cellAge.textContent = patientData.age;
                cellGender.textContent = patientData.gender;
                cellBMI.textContent = patientData.bmi;
                cellBloodPressure.textContent = patientData.bloodpressure;
                cellHeartRate.textContent = patientData.heartrate;
                cellExercise.textContent = patientData.exercise;
            });
        })
        .catch(function (error) {
            console.error("Error fetching data: ", error);
        });
}

window.logout = logout;

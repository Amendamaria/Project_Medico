const firebaseConfig = {
  apiKey: "AIzaSyDA8veGznM1vSv6AF-nEf48lFJXAhWyjlo",
  authDomain: "medico-6f73c.firebaseapp.com",
  databaseURL: "https://medico-6f73c-default-rtdb.firebaseio.com",
  projectId: "medico-6f73c",
  storageBucket: "medico-6f73c.appspot.com",
  messagingSenderId: "1089132950480",
  appId: "1:1089132950480:web:02fb99996e195b28c4bfd5",
  measurementId: "G-D9BRZJ7RFS"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const patientId = localStorage.getItem("patientId");

if (patientId) {

  db.ref("patients").child(patientId).once("value", snapshot => {
    const patientData = snapshot.val();

    if (patientData) {
      // Get the necessary fields from the patient data
      const patientName = patientData.name;
      const patientAge = patientData.age;
      const patientPhone = patientData.phone;
      const patientDept = patientData.department;
      const tokenNumber = patientData.token;

      // Display the data on the success page
      document.getElementById("patientIdDisplay").textContent = `Patient ID: ${patientId}`;
      document.getElementById("tokenNumberDisplay").textContent = `Token Number: ${tokenNumber}`;
      document.getElementById("patientNameDisplay").textContent = `Patient Name: ${patientName}`;
      document.getElementById("departmentDisplay").textContent = `Department: ${patientDept}`;
      document.getElementById("patientAgeDisplay").textContent = `Age: ${patientAge}`;
      document.getElementById("patientPhoneDisplay").textContent = `Phone Number: ${patientPhone}`;

   
      console.log("Patient ID:", patientId);
      console.log("Patient Name:", patientName);
      console.log("Age:", patientAge);
      console.log("Phone Number:", patientPhone);
      console.log("Department:", patientDept);
      console.log("Token Number:", tokenNumber);
    } else {
      console.error("Patient data not found.");
    }
  }).catch((error) => {
    console.error("Error fetching patient data:", error);
  });
} else {
  console.error("Patient ID not found in localStorage.");
}

//timeout 10sec
setTimeout(() => {
  window.location.href = "index.html";
}, 10000);

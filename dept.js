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
  
  const form = document.querySelector(".dept-form");
  
  form.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const dept = form.querySelector('select[name="department"]').value;
  
    if (!dept) {
      alert("Please select a department.");
      return;
    }
  
    const patientId = localStorage.getItem("patientId");
  
    if (!patientId) {
      alert("❌ Patient ID not found. Please go back and fill patient details.");
      return;
    }
  
    db.ref("patients").child(patientId).update({
      department: dept
    })
    .then(() => {
      alert("✅ Department saved for patient ID: " + patientId);
      // You can redirect to another page here
      window.location.href = "index.html";
    })
    .catch((err) => {
      console.error("❌ Error saving department:", err);
    });
  });
  
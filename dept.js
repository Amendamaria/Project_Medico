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

  // Date key in DD-MM-YYYY
  const today = new Date();
  const dateKey = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

  // Token generation under date and dept
  const tokenRef = db.ref(`tokens/${dateKey}/${dept}`);

  tokenRef.transaction((currentToken) => {
    return (currentToken || 0) + 1;
  }, (error, committed, snapshot) => {
    if (error) {
      console.error("❌ Token transaction failed:", error);
    } else if (committed) {
      const tokenNumber = snapshot.val().toString().padStart(2, '0');

      // Update patient with department and token
      db.ref("patients").child(patientId).update({
        department: dept,
        token: tokenNumber,
        tokenDate: dateKey
      })
      .then(() => {
        window.location.href = "success.html";
      })
      .catch((err) => {
        console.error("❌ Error saving department/token:", err);
      });
    }
  });
});

  
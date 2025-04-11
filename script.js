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
const form = document.querySelector(".form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.name.value.trim().toLowerCase();
  const age = form.age.value;
  const gender = form.gender.value;
  const specifyGender = form.specifyGender?.value || "";
  const phone = form.phone.value.trim();
  const place = form.place.value;
  const finalGender = gender === "Others" ? specifyGender : gender;

  const dbRef = db.ref();

  dbRef.child("patients").once("value", snapshot => {
    let isDuplicate = false;

    snapshot.forEach(child => {
      const data = child.val();
      if (
        data.name?.toLowerCase() === name &&
        data.phone === phone
      ) {
        isDuplicate = true;
      }
    });

    if (isDuplicate) {
      alert("❌ Patient with the same name and phone number already exists!");
      return;
    }

    // Step 2: No duplicate, proceed to save
    dbRef.child("patientCounter").transaction((currentValue) => {
      return (currentValue || 99999) + 1;
    }, (error, committed, snapshot) => {
      if (error) {
        console.error("❌ Transaction failed:", error);
      } else if (committed) {
        const rawPatientId = snapshot.val();
        const patientId = rawPatientId.toString().padStart(6, '0');

        const patientData = {
          patientId,
          name,
          age,
          gender: finalGender,
          phone,
          place
        };

        dbRef.child("patients").child(patientId).set(patientData)
          .then(() => {
            localStorage.setItem("patientId", patientId);
            window.location.href = "dept.html";
          })
          .catch((err) => {
            console.error("❌ Firebase error:", err);
          });
      }
    });
  });
});

const form = document.querySelector(".form");

// ✅ Your Firebase config (place this at the top)
const firebaseConfig = {
  apiKey: "AIzaSyDA8veGznM1vSv6AF-nEf48lFJXAhWyjlo",
  authDomain: "medico-6f73c.firebaseapp.com",
  databaseURL: "https://medico-6f73c-default-rtdb.firebaseio.com",
  projectId: "medico-6f73c",
  storageBucket: "medico-6f73c.appspot.com", // 🔁 fixed typo
  messagingSenderId: "1089132950480",
  appId: "1:1089132950480:web:02fb99996e195b28c4bfd5",
  measurementId: "G-D9BRZJ7RFS"
};

// ✅ Initialize Firebase (CDN method)
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const genderRadios = document.querySelectorAll('input[name="gender"]');
const otherGenderBox = document.getElementById("otherGenderTextBox");
const otherGenderInput = document.getElementById("specifyGender");

// Show textbox when "Others" is selected
genderRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "Others" && radio.checked) {
      otherGenderBox.style.display = "block";
      otherGenderInput.setAttribute("required", "true");
      otherGenderInput.focus();
    } else {
      otherGenderBox.style.display = "none";
      otherGenderInput.removeAttribute("required");
      otherGenderInput.value = "";
    }
  });
});

function validateForm() {
  const genderSelected = document.querySelector('input[name="gender"]:checked');
  if (!genderSelected) {
    alert("Please select your gender.");
    return false;
  }
  return true;
}

// Submit handler
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validateForm()) return;

  const name = form.name.value;
  const age = form.age.value;
  const gender = form.gender.value;
  const specifyGender = form.specifyGender?.value || "";
  const phone = form.phone.value;
  const place = form.place.value;

  const finalGender = gender === "Others" ? specifyGender : gender;

  db.ref("patients/").push({
    name,
    age,
    gender: finalGender,
    phone,
    place,
  })
    .then(() => {
      alert("✅ Data saved to Firebase!");
      form.reset();
      otherGenderBox.style.display = "none";
    })
    .catch((err) => {
      console.error("❌ Firebase error:", err);
    });
});


  const genderRadios = document.querySelectorAll('input[name="gender"]');
  const otherGenderBox = document.getElementById("otherGenderTextBox");
  const otherGenderInput = document.getElementById("specifyGender");

  genderRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "Others" && radio.checked) {
        otherGenderBox.style.display = "block";
        otherGenderInput.setAttribute("required", "true");
        otherGenderInput.focus(); // focus right away
      } else {
        otherGenderBox.style.display = "none";
        otherGenderInput.removeAttribute("required");
        otherGenderInput.value = ""; // clear previous input
      }
    });
  });

function validateForm() {
  const genderSelected = document.querySelector('input[name="gender"]:checked');
  if (!genderSelected) {
    alert("Please select your gender.");
    return false;
  }
  return true; // allow form to submit
}
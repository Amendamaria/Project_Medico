
const patientId = localStorage.getItem("patientId");
if (patientId) {
  const patientIdDisplay = document.getElementById("patientIdDisplay");
  if (patientIdDisplay) {
    patientIdDisplay.textContent = `Patient ID: ${patientId}`;
  }
}


setTimeout(() => {
  window.location.href = "index.html";
}, 3000);

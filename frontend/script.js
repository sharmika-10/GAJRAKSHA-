
const API_URL = "http://localhost:3000";

const sightingForm = document.getElementById("sightingForm");

if (sightingForm) {
  sightingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const location = document.getElementById("location").value.trim();
    const time = document.getElementById("time").value;
    const elephantCount = Number(
      document.getElementById("elephantCount").value
    );

    const formMessage = document.getElementById("formMessage");

    try {
      const response = await fetch(`${API_URL}/api/sighting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          location,
          time,
          elephantCount
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit sighting.");
      }

      formMessage.textContent = "Sighting submitted successfully!";
      sightingForm.reset();
    } catch (error) {
      console.error("Error submitting sighting:", error);
      formMessage.textContent =
        "Could not submit sighting. Please check that the backend is running.";
    }
  });
}
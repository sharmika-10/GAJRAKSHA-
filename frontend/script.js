// GAJRAKSHAN+ deployed backend URL
const API_URL = "https://gajraksha.onrender.com";

const sightingForm = document.getElementById("sightingForm");
const formMessage = document.getElementById("formMessage");

if (sightingForm) {
  sightingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get form values
    const location = document.getElementById("location").value.trim();
    const time = document.getElementById("time").value;
    const elephantCount = Number(
      document.getElementById("elephantCount").value
    );

    // Validate input
    if (!location || !time || !elephantCount || elephantCount < 1) {
      if (formMessage) {
        formMessage.textContent =
          "Please enter a location, time, and valid elephant count.";
      }
      return;
    }

    // Show submitting message
    if (formMessage) {
      formMessage.textContent = "Submitting sighting...";
    }

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

      // Read response safely
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to submit sighting."
        );
      }

      // Success
      if (formMessage) {
        formMessage.textContent =
          "Sighting submitted successfully!";
      }

      sightingForm.reset();

    } catch (error) {
      console.error("Error submitting sighting:", error);

      if (formMessage) {
        formMessage.textContent =
          "Could not submit sighting. Please check your internet connection and try again.";
      }
    }
  });
}
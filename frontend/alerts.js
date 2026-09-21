
const API_URL = "http://localhost:3000";

const sightingsList = document.getElementById("sightingsList");

async function loadSightings() {
  try {
    const response = await fetch(`${API_URL}/api/sightings`);

    if (!response.ok) {
      throw new Error("Failed to load sightings");
    }

    const sightings = await response.json();

    if (sightings.length === 0) {
      sightingsList.innerHTML = "<p>No sightings reported yet.</p>";
      return;
    }

    sightingsList.innerHTML = "";

    sightings.forEach((sighting) => {
      const card = document.createElement("div");
      card.className = "sighting-card";

      const location = document.createElement("h3");
      location.textContent = sighting.location;

      const count = document.createElement("p");
      count.textContent = `Elephants: ${sighting.elephantCount}`;

      const time = document.createElement("p");
      time.textContent = `Date and Time: ${sighting.time}`;

      card.append(location, count, time);
      sightingsList.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    sightingsList.textContent =
      "Could not load sightings. Please check the backend server.";
  }
}

loadSightings();
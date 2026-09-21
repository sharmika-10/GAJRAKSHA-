
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary storage for reported sightings
const sightings = [];

// Test route
app.get("/", (req, res) => {
  res.send("GAJRAKSHAN+ backend is running!");
});

// Get all sightings
app.get("/api/sightings", (req, res) => {
  res.json(sightings);
});

// Submit a new sighting
app.post("/api/sighting", (req, res) => {
  const { location, time, elephantCount } = req.body;

  if (!location || !time || !elephantCount) {
    return res.status(400).json({
      message: "Please provide location, time, and elephant count."
    });
  }

  const newSighting = {
    id: Date.now(),
    location,
    time,
    elephantCount: Number(elephantCount)
  };

  sightings.push(newSighting);

  res.status(201).json({
    message: "Sighting submitted successfully!",
    sighting: newSighting
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`GAJRAKSHAN+ server running on port ${PORT}`);
});
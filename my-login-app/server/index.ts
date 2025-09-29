import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors({ origin: "*" })); // or your frontend URL in production
 // allow requests from frontend

// Type for the OpenStreetMap API response
interface GeocodeResponseItem {
  lat: string;
  lon: string;
}

app.get("/geocode", async (req, res) => {
  const address = req.query.address as string;

  if (!address) return res.status(400).json({ error: "Address is required" });

  try {
      const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`,
          { headers: { "User-Agent": "TravelDistBuddy/1.0 (your_email@example.com)" } }
      );


    // Parse JSON with type assertion
    const data = (await response.json()) as GeocodeResponseItem[];

    // Debug logging
    console.log("Raw geocode data:", data);

    if (!Array.isArray(data) || data.length === 0) {
      console.warn(`No results found for "${address}"`);
      return res.status(404).json({ error: "No results found" });
    }

    // Send coordinates back
    const coords = {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };

    console.log(`Coordinates for "${address}":`, coords);
    res.json(coords);
  } catch (err) {
    console.error(`Server error fetching "${address}":`, err);
    res.status(500).json({ error: "Server error", details: err });
  }
});

app.get("/open-landing", (req, res) => {
    // Redirect to second frontend (landing page)
    res.redirect("http://localhost:5173");
    // replace with actual URL of second project
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

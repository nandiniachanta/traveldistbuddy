"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" })); // or your frontend URL in production
app.get("/geocode", async (req, res) => {
    const address = req.query.address;
    if (!address)
        return res.status(400).json({ error: "Address is required" });
    try {
        const response = await (0, node_fetch_1.default)(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`, { headers: { "User-Agent": "TravelDistBuddy/1.0 (your_email@example.com)" } });
        // Parse JSON with type assertion
        const data = (await response.json());
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
    }
    catch (err) {
        console.error(`Server error fetching "${address}":`, err);
        res.status(500).json({ error: "Server error", details: err });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

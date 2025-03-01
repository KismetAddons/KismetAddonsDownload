require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());
app.use(cors());

const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK; // Load webhook securely

app.post("/send", async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: "Missing message content" });
    }

    // Send request to Discord webhook
    const response = await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, username: "Minecraft Bot" }),
    });

    if (!response.ok) {
        return res.status(500).json({ error: "Failed to send message" });
    }

    res.json({ success: true });
});

app.listen(3000, () => console.log("Proxy is running on port 3000"));

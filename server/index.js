const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Feng Shui Server is Running");
});

app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});

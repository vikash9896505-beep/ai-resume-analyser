const uploadRoute = require("./routes/upload");
const express = require("express");
const cors = require("cors");

const uploadRoute = require("./routes/upload");

const app = express();

app.use(cors());
app.use("/upload", uploadRoute);
app.use(express.json());

app.use("/upload", uploadRoute);

app.get("/", (req, res) => {
    res.send("AI Resume Analyser Backend Running...");
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
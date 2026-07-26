const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
    res.send("Resume Upload API Working");
});

module.exports = router;
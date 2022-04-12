const express = require('express');
const firebase = require('./firebase');
const database = require('./database')
router = express.Router();

router.post("/check", function (req, res) {
    firebase.checkToken(req, res);
})

router.get("/test", async function (req, res) {
    const user = database.getUserSubscriptions("8EIIKcHFjNV5jhjeTX1Y9oDE3792").then((r) => {
        console.log(r);
        res.json(r);
    });
})

module.exports = router;
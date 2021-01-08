const express = require("express")
const cors = require("cors")

require('dotenv').config()

const app = express()
app.use(cors())

const db = require("./database");

app.get("/", (req, res) => {
    db.query("SELECT * FROM user", (err, result) => {
        if (err) return res.status(500).json({ message: "Ocorreu um erro na base de dados." });
        res.json(result);
    })
})

app.listen(process.env.PORT, () => {
    console.log("Servidor ligado na porta " + process.env.PORT)
})
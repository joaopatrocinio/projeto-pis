const express = require("express")
const mustacheExpress = require("mustache-express")
const cors = require("cors")

require('dotenv').config()

const app = express()
app.use(cors())
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views'); 

const db = require("./database");

app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/carros", (req, res) => {
    res.render("carros")
})

app.listen(process.env.PORT, () => {
    console.log("Servidor ligado na porta " + process.env.PORT)
})
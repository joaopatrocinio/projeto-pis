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

app.use("/auth", require("./routes/auth"))
app.use("/carro", require("./routes/carro"))
app.use("/marcas", require("./routes/marcas"))
app.use("/modelos", require("./routes/modelos"))
app.use("/utilizadores", require("./routes/utilizadores"))

app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/estatisticas", (req, res) => {
    res.render("estatisticas")
})


app.get("/login", (req, res) => {
    res.render("login")
})

app.listen(process.env.PORT, () => {
    console.log("Servidor ligado na porta " + process.env.PORT)
})
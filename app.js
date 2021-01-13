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
    db.query("SELECT * FROM carro", (err, result) => {
        if (err) return res.status(500).json({
            message: "Erro na base de dados."
        });
        res.render("carros", {
            carros: result
        })
    })
})
app.get("/utilizadores", (req, res) => {
    db.query("SELECT * FROM users ", (err, result) => {
        if (err) return res.status(500).json({
            message: "Erro na base de dados."
        });
        res.render("utilizadores", {
            users: result
        })
    })
})

app.get("/marcas", (req, res) => {
    db.query("SELECT * FROM marca", (err, result) => {
        if (err) return res.status(500).json({
            message: "Erro na base de dados."
        });
        res.render("marcas", {
            marcas: result
        })
    })
})

app.get("/modelos", (req, res) => {
    db.query("SELECT modelo.id,modelo.modeloNome,marca.marcaNome FROM modelo JOIN marca  ON modelo.modeloMarcaId=marca.id ", (err, result) => {
        if (err) return res.status(500).json({
            message: "Erro na base de dados."
        });
        res.render("modelos", {
            modelos: result
        })
           
        })
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
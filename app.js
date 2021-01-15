const express = require("express")
const axios = require('axios');
const mustacheExpress = require("mustache-express")
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")
const cors = require("cors")

require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

const db = require("./database");

app.use("/api/auth", require("./routes/auth"))
app.use("/api/carro", require("./routes/carro"))
app.use("/api/marcas", require("./routes/marcas"))
app.use("/api/modelos", require("./routes/modelos"))
app.use("/api/utilizadores", require("./routes/utilizadores"))

app.use(express.static("./public"));

app.get("/", (req, res) => {
    jwt.verify(req.cookies.access_token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return false
        db.query('SELECT id, email, firstName, lastName, userTypeId FROM users WHERE id = ?;', [decoded.id], (err, result) => {
            if (!result) {
                return false;
            }
            res.render("home", {
                token: req.cookies.access_token,
                isAdmin: result[0].userTypeId == 1 ? true : false,
                isSeller: result[0].userTypeId == 2 ? true : false,
                isBuyer: result[0].userTypeId == 3 ? true : false
            })
        });
    })
})

app.get("/estatisticas", (req, res) => {
    res.render("estatisticas")
})

app.get("/marcas", (req, res) => {
    axios.get("http://localhost:8080/api/marcas")
    .then(response => {
        jwt.verify(req.cookies.access_token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return false
            db.query('SELECT id, email, firstName, lastName, userTypeId FROM users WHERE id = ?;', [decoded.id], (err, result) => {
                if (!result) {
                    return false;
                }
                res.render("marcas", {
                    marcas: response.data,
                    token: req.cookies.access_token,
                    isAdmin: result[0].userTypeId == 1 ? true : false,
                    isSeller: result[0].userTypeId == 2 ? true : false,
                    isBuyer: result[0].userTypeId == 3 ? true : false
                })
            });
        })
    })
    .catch(err => {
        console.log(err)
    })
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.listen(process.env.PORT, () => {
    console.log("Servidor ligado na porta " + process.env.PORT)
})
const express = require('express');
const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const axios = require('axios');
const mustacheExpress = require("mustache-express")
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")
const cors = require("cors")
require('dotenv').config()

const db = require("./database");
const checkLogin = require("./authentication/check-login");
const checkAdmin = require("./authentication/check-admin");
const passportSetup = require("./authentication/passport");

// Express settings
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Session setup
var options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};

var sessionStore = new MySQLStore(options);

app.use(session({
    key: "stand_session",
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
passportSetup(passport);

app.use(express.static("./public"));

// API Routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/carro", require("./routes/carro"))
app.use("/api/marcas", require("./routes/marcas"))
app.use("/api/modelos", require("./routes/modelos"))
app.use("/api/utilizadores", require("./routes/utilizadores"))

// Require Controllers
const CarroController = require("./controllers/CarroController")
const MarcasController = require("./controllers/MarcasController")
const ModelosController = require("./controllers/ModelosController")

// Views
app.get("/", (req, res) => {
    if (!req.cookies.access_token) return res.render("home");
    res.render("home", {
        token: req.cookies.access_token,
        isAdmin: req.user.userTypeId == 1 ? true : false,
        isSeller: req.user.userTypeId == 2 ? true : false,
        isBuyer: req.user.userTypeId == 3 ? true : false
    })
})

app.get("/estatisticas", (req, res) => {
    res.render("estatisticas")
})

app.get("/carros", checkLogin, (req, res) => {
    CarroController.getCarros()
    .then(response => {
        MarcasController.getMarcas()
        .then(response2 => {
            ModelosController.getModelos()
            .then(response3 => {
                res.render("carros", {
                    carros: response,
                    marcas: response2,
                    modelos: response3,
                    token: req.cookies.access_token,
                    isAdmin: req.user.userTypeId == 1 ? true : false,
                    isSeller: req.user.userTypeId == 2 ? true : false,
                    isBuyer: req.user.userTypeId == 3 ? true : false
                })
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
})

app.get("/carros", (req, res) => {
    CarroController.getCarros()
    .then(response => {
        MarcasController.getMarcas()
        .then(response2 => {
            ModelosController.getModelos()
            .then(response3 => {
                res.render("carros", {
                    carros: response.map(carro => {
                        carro.preco = carro.atributos.find(atributo => atributo.atributo == "preco").valor;
                        return carro;
                    }),
                    marcas: response2,
                    modelos: response3
                })
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
})

app.get("/marcas", checkLogin.forbidden, (req, res) => {
    MarcasController.getMarcas()
    .then(response => {
        res.render("marcas", {
            marcas: response
        })
    })
    .catch(err => {
        console.log(err)
    })
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/login", (req, res) => {
    axios.post("http://localhost:8080/api/auth/login", req.body)
    .then(response => {
        req.login(response.data.user, function (err) {
            if (err) { console.log(err); }
            else {
                var token = jwt.sign({
                    id: response.data.user.id,
                }, process.env.JWT_SECRET, {
                    expiresIn: 6064800 // expires in 1 week
                });
                res.cookie('access_token', token, {
                    expires: new Date(Date.now() + 6064800)
                }).redirect("/");
            }
        });
    })
})

app.post("/registo", (req, res) => {
    axios.post("http://localhost:8080/api/auth/signup", req.body)
    .then(response => {
        req.login(response.data.user, function (err) {
            if (err) { console.log(err); }
            else {
                var token = jwt.sign({
                    id: response.data.user.id,
                }, process.env.JWT_SECRET, {
                    expiresIn: 6064800 // expires in 1 week
                });
                res.cookie('access_token', token, {
                    expires: new Date(Date.now() + 6064800)
                }).redirect("/");
            }
        });
    })
})

app.get("/logout", (req, res) => {
    req.logout();
    res.clearCookie("access_token");
    res.redirect("/")
})

app.listen(process.env.PORT, () => {
    console.log("Servidor ligado na porta " + process.env.PORT)
})
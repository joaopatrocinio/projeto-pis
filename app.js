const express = require('express');
const session = require("express-session");
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const mustacheExpress = require("mustache-express")
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")
const cors = require("cors")
const upload = require("express-fileupload");
require('dotenv').config()


const db = require("./database");
const checkLogin = require("./authentication/check-login");
const checkAdmin = require("./authentication/check-admin");
const checkSeller = require("./authentication/check-seller");
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
app.use(upload({
    preserveExtension: true
}))

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
const AuthController = require("./controllers/AuthController")
const CarroController = require("./controllers/CarroController")
const MarcasController = require("./controllers/MarcasController")
const ModelosController = require("./controllers/ModelosController")
const UtilizadoresController = require("./controllers/UtilizadoresController")

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

app.get("/estatisticas", checkAdmin, (req, res) => {
    CarroController.getCarros()
    .then(response => {
        MarcasController.getMarcas()
        .then(response2 => {
            UtilizadoresController.getUtilizadores()
            .then(response3 => {
                let carros = response.map(carro => {
                    carro.preco = carro.atributos.find(atributo => atributo.atributo == "preco").valor.replace(/\d(?=(?:\d{3})+$)/g, '$&.');
                    return carro;
                })
                let totalUtilizadores = response3.length;
                let totalCarros = response.length;
                let totalMarcas = response2.length;
                let carroMaisCaro = 0;
                carroMaisCaro = response.find(carro => carro.preco > carroMaisCaro).preco + "€";
                let totalViews;
                CarroController.getViewsTotal()
                .then(response4 => {
                    totalViews = response4.views;
                    res.render("estatisticas", {
                        totalUtilizadores: totalUtilizadores,
                        totalCarros: totalCarros,
                        totalMarcas: totalMarcas,
                        carroMaisCaro: carroMaisCaro,
                        totalViews: totalViews,
                        token: req.cookies.access_token,
                        isAdmin: req.user.userTypeId == 1 ? true : false,
                        isSeller: req.user.userTypeId == 2 ? true : false,
                        isBuyer: req.user.userTypeId == 3 ? true : false
                    })
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

app.get("/carros", checkLogin, (req, res) => {
    CarroController.getCarros()
    .then(response => {
        MarcasController.getMarcas()
        .then(response2 => {
            ModelosController.getModelos()
            .then(response3 => {
                res.render("carros", {
                    carros: response.map(carro => {
                        carro.preco = carro.atributos.find(atributo => atributo.atributo == "preco").valor.replace(/\d(?=(?:\d{3})+$)/g, '$&.');
                        return carro;
                    }),
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
                        carro.preco = carro.atributos.find(atributo => atributo.atributo == "preco").valor.replace(/\d(?=(?:\d{3})+$)/g, '$&.');
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

app.get("/carro/:id", checkLogin, (req, res) => {
    CarroController.getCarroById(req.params.id)
    .then(response => {
        MarcasController.getMarcas()
        .then(response2 => {
            ModelosController.getModelos()
            .then(response3 => {
                res.render("detalhes", {
                    carro: response.map(carro => {
                        carro.Preco = carro.atributos.find(atributo => atributo.atributo == "preco").valor.replace(/\d(?=(?:\d{3})+$)/g, '$&.');
                        carro.Km =carro.atributos.find(atributo => atributo.atributo == "quilometro").valor.replace(/\d(?=(?:\d{3})+$)/g, '$& ');
                        carro.Ano =carro.atributos.find(atributo => atributo.atributo == "ano").valor;
                        carro.VelocidadeMax =carro.atributos.find(atributo => atributo.atributo == "velocidadeMax").valor;
                        carro.Cilindrada =carro.atributos.find(atributo => atributo.atributo == "cilindrada").valor;
                        carro.Combustivel =carro.atributos.find(atributo => atributo.atributo == "combustivel").valor;
                        carro.Potencia =carro.atributos.find(atributo => atributo.atributo == "potencia").valor;
                        carro.TipoCaixa =carro.atributos.find(atributo => atributo.atributo == "tipoCaixa").valor;
                        return carro;
                    }),
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

app.get("/carro/:id", (req, res) => {
    CarroController.getCarroById(req.params.id)
    .then(response => {
        MarcasController.getMarcas()
        .then(response2 => {
            ModelosController.getModelos()
            .then(response3 => {
                res.render("detalhes", {
                    carro: response.map(carro => {
                        carro.Preco = carro.atributos.find(atributo => atributo.atributo == "preco").valor.replace(/\d(?=(?:\d{3})+$)/g, '$&.');
                        carro.Km =carro.atributos.find(atributo => atributo.atributo == "quilometro").valor.replace(/\d(?=(?:\d{3})+$)/g, '$& ');
                        carro.Ano =carro.atributos.find(atributo => atributo.atributo == "ano").valor;
                        carro.VelocidadeMax =carro.atributos.find(atributo => atributo.atributo == "velocidadeMax").valor;
                        carro.Cilindrada =carro.atributos.find(atributo => atributo.atributo == "cilindrada").valor;
                        carro.Combustivel =carro.atributos.find(atributo => atributo.atributo == "combustivel").valor;
                        carro.Potencia =carro.atributos.find(atributo => atributo.atributo == "potencia").valor;
                        carro.TipoCaixa =carro.atributos.find(atributo => atributo.atributo == "tipoCaixa").valor;
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

app.get("/marcas", checkAdmin, (req, res) => {
    MarcasController.getMarcas()
    .then(response => {
        res.render("marcas", {
            marcas: response,
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

app.get("/modelos", checkAdmin, (req, res) => {
    ModelosController.getModelos()
    .then(response => {
        MarcasController.getMarcas()
            .then(response2 => {
                res.render("modelos", {
                    modelos: response,
                    marcas: response2,
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

app.get("/utilizadores", checkAdmin, (req, res) => {
    UtilizadoresController.getUtilizadores()
    .then(response => {
        UtilizadoresController.getUserTypes()
        .then(response2 => {
            res.render("utilizadores", {
                users: response.map(user => {
                    user.userType = response2.find(userType => user.userTypeId == userType.id).userType;
                    return user;
                }),
                tipos: response2,
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

app.get("/anuncios", checkSeller, (req, res) => {
    CarroController.getCarrosVendedor(req.user.id)
    .then(response => {
        res.render("anuncios", {
            token: req.cookies.access_token,
            isAdmin: req.user.userTypeId == 1 ? true : false,
            isSeller: req.user.userTypeId == 2 ? true : false,
            isBuyer: req.user.userTypeId == 3 ? true : false,
            anuncios: response
        })
    })
    .catch(err => console.log(err))
})

app.get("/criaranuncio", checkSeller, (req, res) => {
    MarcasController.getMarcas()
    .then(response => {
        ModelosController.getModelos()
        .then(response2 => {
            res.render("criaranuncio", {
                marcas: response,
                modelos: response2,
                token: req.cookies.access_token,
                isAdmin: req.user.userTypeId == 1 ? true : false,
                isSeller: req.user.userTypeId == 2 ? true : false,
                isBuyer: req.user.userTypeId == 3 ? true : false
            })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

app.post("/criaranuncio", checkSeller, (req, res) => {
    CarroController.inserirCarro(
        req.body.idmarca,
        req.body.idmodelo,
        req.body.descricao,
        req.body.ano,
        req.body.preco,
        req.body.quilometro,
        req.body.velocidadeMax,
        req.body.cilindrada,
        req.body.combustivel,
        req.files.imagemCarro.name,
        req.body.potencia,
        req.body.tipoCaixa,
        req.user.id
    ).then(response => {
        CarroController.uploadPhoto(response.id, req.files.imagemCarro)
        .then(response2 => {
            res.redirect("/carros")
        })
        .catch(err => console.log(err));
    }).catch(err => console.log(err));
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/login", (req, res) => {
    AuthController.login(req.body.email, req.body.password)
    .then(user => {
        req.login(user, function (err) {
            if (err) { console.log(err); }
            else {
                var token = jwt.sign({
                    id: user.id,
                }, process.env.JWT_SECRET, {
                    expiresIn: 6064800 // expires in 1 week
                });
                res.cookie('access_token', token, {
                    expires: new Date(Date.now() + 6064800)
                }).redirect("/");
            }
        });
    })
    .catch(err => console.log(err))
})

app.post("/registo", (req, res) => {
    AuthController.signup(req.body.email, req.body.password, req.body.firstName, req.body.lastName, req.body.userTypeId, req.body.contacto)
    .then(data => {
        req.login(data.user, function (err) {
            if (err) { console.log(err); }
            else {
                var token = jwt.sign({
                    id: data.user.id,
                }, process.env.JWT_SECRET, {
                    expiresIn: 6064800 // expires in 1 week
                });
                res.cookie('access_token', token, {
                    expires: new Date(Date.now() + 6064800)
                }).redirect("/");
            }
        });
    })
    .catch(err => console.log(err))
})

app.get("/logout", (req, res) => {
    req.logout();
    res.clearCookie("access_token");
    res.redirect("/")
})

app.listen(process.env.PORT, () => {
    console.log("Servidor ligado na porta " + process.env.PORT)
})
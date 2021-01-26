const router = require('express').Router();
const auth = require("../controllers/AuthController")
const checkToken = require("../authentication/check-token")
const db = require('../database.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

router.post('/login', (req, res, next) => {
    auth.login(req.body.login, req.body.password)
    .then(user => {
        var token = jwt.sign({
            id: user.id,
        }, process.env.JWT_SECRET, {
            expiresIn: 6064800 // expires in 1 week
        });
        res.json({ message: 'Login efetuado com sucesso.', token: token, user: user });
    })
    .catch(err => console.log(err))
});

router.post('/signup', (req, res, next) => {
    auth.signup(req.body.email, req.body.password, req.body.firstName, req.body.lastName, req.body.userTypeId, req.body.contacto)
    .then(data => res.json(data))
    .catch(err => console.log(err))
});

function me(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ message: "Não tem uma sessão iniciada." });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json({
            message: 'Ocorreu um erro ao identificar o seu token de acesso. Tente outra vez.'
        });
        db.query('SELECT id, userTypeId FROM users WHERE id = ?', [decoded.id], function (error, results, fields) {
            if (error) {
                return res.status(500).json({
                    message: "Ocorreu um erro na base de dados. Tente outra vez."
                })
            }
            if (!results[0]) {
                return res.status(403).json({
                    message: 'Token de acesso inválido. Não tem login feito.'
                });
            }
            res.json(results[0])
        });
    })
}

router.get('/me', me);

module.exports = router;
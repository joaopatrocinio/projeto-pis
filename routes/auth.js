const router = require('express').Router();
const mysql = require('mysql');
const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

function login(req, res, next) {
    if (req.body.email && req.body.password) {
        db.query('SELECT * from users WHERE email = ?', [req.body.email], (err, result) => {
            if (err) return res.status(500).json({ message: 'Ocorreu um erro a identificar o utilizador.' });
            if (!result[0]) {
                return res.status(401).json({ message: 'Autenticação falhada, credenciais incorretas.' });
            }
            var passwordIsValid = bcrypt.compareSync(req.body.password, result[0].password);
            if (!passwordIsValid) {
                return res.status(401).json({ response: 'Autenticação falhada, credenciais incorretas.' });
            }
            var token = jwt.sign({
                id: result[0].id,
            }, process.env.JWT_SECRET, {
                expiresIn: 6064800 // expires in 1 week
            });
            res.cookie('access_token', token, {
                expires: new Date(Date.now() + 6064800)
            }).redirect("/");
        });
       
    } else {
        return res.status(400).json({ message: 'Dados inválidos.' });
    }
}

function me(req, res) {
    var token = req.header('X-Access-Token');
    if (!token) return res.status(401).json({ message: 'Pedido necessita do token de identificação.' });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Ocorreu um erro a identificar o utilizador.' });
        db.query('SELECT id, email, firstName, lastName FROM users WHERE id = ?;', [decoded.id], (err, result) => {
            if (!result[0]) {
                return res.status(404).json({ message: 'Token inválido.' });
            }
            return res.status(200).json({ user: result[0] });
        });
    })
}

function signup(req, res) {
    if (req.body.email && req.body.password && req.body.firstName && req.body.lastName && req.body.userTypeId && req.body.contacto) {
        db.query('SELECT * FROM users WHERE email = ?', [req.body.email], function (err, rows) {
            if (err) { next(err); }
            else if (rows.length) { res.status(409).json({ message: 'Já existe uma conta com este email.' }) }
            else {
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    if (err) { next(err); }
                    else {
                        db.query(mysql.format('INSERT INTO users (email, password, firstName, lastName, userTypeId, contacto) VALUES (?, ?, ?, ?, ?, ?)', [req.body.email, hash,  req.body.firstName, req.body.lastName, req.body.userTypeId, req.body.contacto]), function (err, rows) {
                            if (err) { next(err); }
                            else { res.json({ message: 'Registo efetuado com sucesso.', user: { 
                                id: rows.insertId, 
                                email: req.body.email,
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                userTypeId: req.body.userTypeId,
                                contacto: req.body.contacto
                            } }); }
                        });
                    }
                });
            }
        });
    }
    else { res.status(400).json({ message: 'Campos em falta.' }); }
}

router.post('/login', login);
router.post('/signup', signup);
router.get("/me", me);

module.exports = router;
const router = require('express').Router();
const mysql = require('mysql');
const db = require('../database.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const passport = require('passport');

function login(req, res, next) {
    db.query('SELECT * FROM users WHERE email = ?', [req.body.email], function (err, rows) {
        if (err) { done(err); }
        else if (!rows.length) { done(null, false, { message: 'Utilizador não encontrado.' }); }
        else {
            bcrypt.compare(req.body.password, rows[0].password, function (err, result) {
                if (err) { done(err); }
                else if (result) {
                    delete rows[0].password
                    req.login(rows[0], function (err) {
                        if (err) { next(err); }
                        else {
                            var token = jwt.sign({
                                id: rows[0].id,
                            }, process.env.JWT_SECRET, {
                                expiresIn: 6064800 // expires in 1 week
                            });
                            res.json({ message: 'Login efetuado com sucesso.', token: token, user: rows[0] }); 
                        }
                    });
                }
                else { 
                    res.json({ message: "Login incorreto." });
                }
            });
        }
    })
}

function signup(req, res, next) {
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

function logout(req, res) {
    req.logout();
    res.json({ message: 'Logout efetuado com sucesso' });
}

function verify(req, res) {
    if (req.user) {
        res.json({ message: 'Utilizador está logado.', user: req.user })
    }
    else {
        res.json({ message: 'Utilizador não está logado.' })
    }
}

router.post('/login', login);
router.post('/signup', signup);
router.get('/logout', logout);
router.get('/verify', verify);

module.exports = router;
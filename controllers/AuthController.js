const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

function login(email, password) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], function (err, rows) {
            if (err) { reject(err); }
            else if (!rows.length) { reject({ message: 'Utilizador não encontrado.' }); }
            else {
                bcrypt.compare(password, rows[0].password, function (err, result) {
                    if (err) { reject(err); }
                    else if (result) {
                        delete rows[0].password
                        return resolve(rows[0]);
                    }
                    else { 
                        reject({ message: "Login incorreto." });
                    }
                });
            }
        })
    })
}

function signup(email, password, firstName, lastName, userTypeId, contacto) {
    return new Promise((resolve, reject) => {
        if (email && password && firstName && lastName && userTypeId && contacto) {
            db.query('SELECT * FROM users WHERE email = ?', [email], function (err, rows) {
                if (err) { reject(err); }
                else if (rows.length) { reject({ message: 'Já existe uma conta com este email.' }) }
                else {
                    bcrypt.hash(password, 10, function (err, hash) {
                        if (err) { reject(err); }
                        else {
                            db.query('INSERT INTO users (email, password, firstName, lastName, userTypeId, contacto) VALUES (?, ?, ?, ?, ?, ?)', [email, hash,  firstName, lastName, userTypeId, contacto], function (err, rows) {
                                if (err) { reject(err); }
                                else { resolve({ message: 'Registo efetuado com sucesso.', user: { 
                                    id: rows.insertId, 
                                    email: email,
                                    firstName: firstName,
                                    lastName: lastName,
                                    userTypeId: userTypeId,
                                    contacto: contacto
                                } }); }
                            });
                        }
                    });
                }
            });
        }
        else { reject({ message: 'Campos em falta.' }); }
    })
}

module.exports.login = login;
module.exports.signup = signup;
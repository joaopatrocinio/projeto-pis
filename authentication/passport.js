const mysql = require('mysql');
const db = require('../database.js');
const bcrypt = require('bcrypt');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        db.query('SELECT * FROM users WHERE id = ?', [id], function (err, rows) {
            if (err) { done(err); }
            else {
                delete rows[0].password;
                done(null, rows[0]);
            }
        });
    });
};
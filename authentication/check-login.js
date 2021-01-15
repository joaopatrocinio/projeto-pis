const db = require('../database');
const jwt = require("jsonwebtoken")

module.exports = {
    checkLogin: function (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return false
            db.query('SELECT id, email, firstName, lastName, userTypeId FROM users WHERE id = ?;', [decoded.id], (err, result) => {
                if (!result) {
                    return false;
                }
                return result[0].userTypeId;
            });
        })
    },
};
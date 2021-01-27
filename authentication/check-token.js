const express = require("express")
const jwt = require("jsonwebtoken")
const db = require("../database")
const router = express.Router();

// Verifica se tem login feito, e que tipo de utilizador é

router.use((req, res, next) => {
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
            req.user = results[0]
            req.isAdmin = false;
            req.isSeller = false;
            req.isBuyer = false;
            switch (results[0].userTypeId) {
                case 1:
                    req.isAdmin = true;
                    break;
                case 2:
                    req.isSeller = true;
                    break;
                case 3:
                    req.isBuyer = true;
                    break;
                default:
                    break;
            }
            next();
        });
    })
})

module.exports = router;
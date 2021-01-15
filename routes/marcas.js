const router = require('express').Router();
const mysql = require('mysql');
const mysqlPool = require('../config/mysql-pool');
const checkLogin = require("../authentication/check-login")

function getMarcas(req, res) {
    mysqlPool.query(mysql.format('SELECT * FROM marca'), function (err, rows) {
        if (err) { throw err }
        else {
            res.json(rows)
        }
    });
}

function getMarcaById(req, res) {
    if (req.params.id) {
        mysqlPool.query(mysql.format('SELECT * FROM marca WHERE id = ?', [req.params.id]), function (err, rows) {
            if (err) { throw err }
            else {
                res.json(rows)
            }
        });
    }
}

function inserirMarcas(req, res) {
    if (req.body.marcaNome) {
        mysqlPool.query(mysql.format('INSERT INTO marca (marcaNome) VALUES (?)', [req.body.marcaNome]), function (err, rows) {
            if (err) { throw err }
            else {
                res.json({ message: "Marca inserida com sucesso.", id: rows.insertId });
            }
        });
    }
}

function updateMarcas(req, res) {
    if (req.params.id) {
        if (req.body.marcaNome) {
            mysqlPool.query(mysql.format('UPDATE marca SET marcaNome = ? WHERE id = ?', [req.body.marcaNome, req.params.id]), function (err, rows) {
                if (err) { throw err }
                else {
                    res.json({ message: "Marca atualizada com sucesso." });
                }
            });
        }
    }
}

router.get("/", getMarcas);
router.get("/id/:id", getMarcaById);
router.post("/", inserirMarcas);
router.put("/id/:id", updateMarcas);

module.exports = router;
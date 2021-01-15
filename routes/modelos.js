const router = require('express').Router();
const mysql = require('mysql');
const db = require('../database');
const checkLogin = require("../authentication/check-login")

function getModelos(req, res) {
    mysqlPool.query(mysql.format('SELECT * FROM modelo'), function (err, rows) {
        if (err) { throw err }
        else {
            res.json(rows)
        }
    });
}

function getModelosByMarca(req, res) {
    if (req.params.marca_id) {
        mysqlPool.query(mysql.format('SELECT * FROM modelo WHERE modeloMarcaId = ?', [req.params.marca_id]), function (err, rows) {
            if (err) { throw err }
            else {
                res.json(rows)
            }
        });
    }
}

function inserirModelo(req, res) {
    if (req.body.marcaId &&
        req.body.modeloNome
    ) {
        mysqlPool.query(mysql.format('INSERT INTO modelo (modeloNome, modeloMarcaId) VALUES (?, ?)', [req.body.modeloNome, req.body.marcaId]), function (err, rows) {
            if (err) { throw err }
            else {
                res.json({ message: "Modelo inserido com sucesso.", id: rows.insertId });
            }
        });
    }
}

function updateModelo(req, res) {
    if (req.params.id) {
        if (req.body.marcaId &&
            req.body.modeloNome
        ) {
            mysqlPool.query(mysql.format('UPDATE modelo SET modeloNome = ?, modeloMarcaId = ? WHERE id = ?', [req.body.modeloNome, req.body.marcaId, req.params.id]), function (err, rows) {
                if (err) { throw err }
                else {
                    res.json({ message: "Modelo atualizado com sucesso." });
                }
            });
        }
    }
}

router.get("/", getModelos);
router.get("/marca/:marca_id", getModelosByMarca);
router.put("/id/:id", updateModelo);
router.post("/", inserirModelo);

module.exports = router;
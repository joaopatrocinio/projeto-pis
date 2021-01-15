const router = require('express').Router();
const mysql = require('mysql');
const mysqlPool = require('../config/mysql-pool');
const fs = require('fs');

function getCarros(req, res) {
    mysqlPool.query(mysql.format('SELECT * FROM carro'), function (err, rows) {
        if (err) { throw err }
        else {
            res.json(rows);
        }
    });
}

function getCarroById(req, res) {
    if (req.params.id) {
        mysqlPool.query(mysql.format('SELECT * FROM carro WHERE id = ?', [req.params.id]), function (err, rows) {
            if (err) { throw err }
            else {
                res.json(rows)
            }
        });
    }
}

function getAtributos(req, res) {
    mysqlPool.query(mysql.format('SELECT * FROM atributos'), function (err, rows) {
        if (err) { throw err }
        else {
            res.json(rows);
        }
    });
}

function verContacto(req, res) {
    mysqlPool.query(mysql.format('SELECT f_contacto_carro(?) as "contacto"', [req.params.carro_id]), function (err, rows) {
        if (err) { throw err }
        else {
            let result = rows[0];
            
            mysqlPool.query(mysql.format('INSERT INTO log_mostrar_contacto (carroId, userId) VALUES (?, ?)', [req.params.carro_id, req.user.id]), function (err, rows) {
                if (err) { throw err }
                else {
                    res.json(result);
                }
            });
        }
    });
}

function inserirCarro(req, res) {
    if (req.body.marcaId &&
        req.body.modeloId &&
        req.body.descricao &&
        req.body.ano &&
        req.body.preco &&
        req.body.quilometro &&
        req.body.velocidadeMax &&
        req.body.cilindrada &&
        req.body.combustivel &&
        req.body.imagem &&
        req.body.potencia &&
        req.body.tipoCaixa
    ) {
        // verificar se utilizador é vendedor ou administrador
        if (req.user.userTypeId < 3) {
            mysqlPool.query(mysql.format('CALL sp_inserir_carro(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                req.body.marcaId,
                req.body.modeloId,
                req.body.descricao,
                req.body.ano,
                req.body.preco,
                req.body.quilometro,
                req.body.velocidadeMax,
                req.body.cilindrada,
                req.user.id,
                req.body.combustivel,
                req.body.imagem,
                req.body.potencia,
                req.body.tipoCaixa
            ]), function (err, rows) {
                if (err) { throw err }
                else {
                    res.json({ message: "Carro inserido com sucesso." });
                }
            });
        } else {
            res.status(401).json({ message: "A sua conta não lhe permite inserir anúncios." });
        }
    } else {
        res.status(400).json({ message: "Campos em falta." });
    }
}

function getViews(req, res) {
    if (req.params.id) {
        mysqlPool.query(mysql.format("SELECT count(*) as views FROM log_mostrar_contacto where carroId = ?", [req.params.id]), function (err, rows) {
            if (err) { throw err }
            else {
                res.json(rows[0]);
            }
        })
    }
}

function getViewsTotal(req, res) {
    mysqlPool.query(mysql.format("SELECT count(*) as views FROM log_mostrar_contacto"), function (err, rows) {
        if (err) { throw err }
        else {
            res.json(rows[0]);
        }
    })
}

function uploadPhoto(req, res) {
    if (!fs.existsSync("./www/uploads/")){
        fs.mkdirSync("./www/uploads/");
    }
    if (req.params.id) {
        if (req.files) {
            var file = req.files.file;
            var filename = req.params.id + "." + file.mimetype.split("/")[1];
    
            if (file.mimetype.split("/")[0] == "image") {
                file.mv("./www/uploads/" + filename, function (err) {
                    if (err) return res.status(500).json({ message: "Erro ao enviar ficheiro." });
                    res.json({ message: "Ficheiro enviado com sucesso.", filename: filename });
                })
            } else {
                res.status(400).json({ message: "Não são suportados ficheiros que não sejam imagens." });
            }
        } else {
            res.status(400).json({ message: "É obrigatório enviar uma imagem." });
        }

    }
}

router.get("/", getCarros);
router.get("/id/:id", getCarroById);
router.get("/atributos", getAtributos);

router.get("/:carro_id/contacto", require("../authentication/check-login"), verContacto);
router.post("/", require("../authentication/check-login"), inserirCarro);

router.get("/views/:id", require("../authentication/check-login"), getViews);
router.get("/views/getViews/getTotal", require("../authentication/check-admin"), getViewsTotal);

router.post("/imagem/id/:id", require("../authentication/check-login"), uploadPhoto);

module.exports = router;
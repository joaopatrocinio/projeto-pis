const router = require('express').Router();
const db = require('../database');

function getUtilizadores(req, res) {
    db.query('SELECT id, email, firstName, lastName, userTypeId, contacto FROM users', function (err, rows) {
        if (err) {
            throw err
        } else {
            res.json(rows);
        }
    });
}

function getUtilizadoresById(req, res) {
    if (req.params.id) {
        db.query('SELECT id, email, firstName, lastName, userTypeId, contacto FROM users WHERE id = ?', [req.params.id], function (err, rows) {
            if (err) {
                throw err
            } else {
                res.json(rows)
            }
        });
    }
}

function updateUtilizador(req, res) {
    if (!req.isAdmin) return res.status(403).json({ message: "Não tem permissão para fazer este pedido." })
    if (req.params.id &&
        req.body.firstName &&
        req.body.lastName &&
        req.body.email &&
        req.body.userTypeId &&
        req.body.contacto
    ) {
        // verificar se utilizador é vendedor ou administrador
        if (req.user.userTypeId < 3) {
            db.query('UPDATE users SET email = ?, firstName = ?, lastName = ?, userTypeId = ?, contacto = ? WHERE id = ?', [
                req.body.email,
                req.body.firstName,
                req.body.lastName,
                req.body.userTypeId,
                req.body.contacto,
                req.params.id
            ], function (err, rows) {
                if (err) {
                    throw err
                } else {
                    res.json({
                        message: "Utilizador atualizado com sucesso."
                    });
                }
            });
        } else {
            res.status(401).json({
                message: "A sua conta não lhe permite atualizar utilizadores."
            });
        }
    } else {
        res.status(400).json({
            message: "Campos em falta."
        });
    }
}

function deleteUtilizador(req, res) {
    if (!req.isAdmin) return res.status(403).json({ message: "Não tem permissão para fazer este pedido." })
    if (req.params.id) {
        if (req.params.id != req.user.id) {
            db.query('DELETE FROM users WHERE id = ?', [req.params.id], function (err, rows) {
                if (err) {
                    throw err
                } else {
                    res.json({
                        message: "O utilizador foi apagado com sucesso."
                    });
                }
            });
        } else {
            res.status(400).json({
                message: "Não pode apagar o seu próprio utilizador."
            });
        }
    }
}

function getUserTypes(req, res) {
    db.query('SELECT * FROM userstype', function (err, rows) {
        if (err) {
            throw err
        } else {
            res.json(rows);
        }
    });
}

router.get("/", getUtilizadores);
router.get("/id/:id", getUtilizadoresById);
router.put("/id/:id", updateUtilizador);
router.delete("/id/:id", deleteUtilizador);
router.get("/tipos", getUserTypes);

module.exports = router;
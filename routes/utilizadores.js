const router = require('express').Router();
const utilizadores = require("../controllers/UtilizadoresController")
const checkToken = require("../authentication/check-token")

router.get("/", (req, res) => {
    utilizadores.getUtilizadores()
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

router.get("/id/:id", (req, res) => {
    utilizadores.getUtilizadoresById(req.params.id)
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

router.put("/id/:id", checkToken, (req, res) => {
    if (!req.isAdmin) return res.status(403).json({ message: "Não tem permissão para fazer este pedido." })
    utilizadores.updateUtilizador(req.params.id, req.body.firstName, req.body.lastName, req.body.email, req.body.userTypeId, req.body.contacto)
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

router.delete("/id/:id", checkToken, (req, res) => {
    if (!req.isAdmin) return res.status(403).json({ message: "Não tem permissão para fazer este pedido." })
    utilizadores.deleteUtilizador(req.params.id)
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

router.get("/tipos", (req, res) => {
    utilizadores.getUserTypes()
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

module.exports = router;
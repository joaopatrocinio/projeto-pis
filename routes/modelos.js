const router = require('express').Router();
const modelos = require("../controllers/ModelosController")
const checkToken = require("../authentication/check-token")

router.get("/", (req, res) => {
    modelos.getModelos()
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

router.get("/marca/:marca_id", (req, res) => {
    modelos.getModelosByMarca(req.params.marca_id)
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

router.post("/", checkToken, (req, res) => {
    if (!req.isAdmin) return res.status(403).json({ message: "Não tem permissão para fazer este pedido." })
    modelos.inserirModelo(req.body.marcaId, req.body.modeloNome)
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

router.put("/id/:id", checkToken, (req, res) => {
    if (!req.isAdmin) return res.status(403).json({ message: "Não tem permissão para fazer este pedido." })
    modelos.updateModelo(req.params.id, req.body.marcaId, req.body.modeloNome)
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

module.exports = router;
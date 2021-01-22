const router = require('express').Router();
const marcas = require("../controllers/MarcasController")
const checkToken = require("../authentication/check-token")

router.get("/", (req, res) => {
    marcas.getMarcas()
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

router.get("/id/:id", (req, res) => {
    marcas.getMarcaById(req.params.id)
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

router.post("/", checkToken, (req, res) => {
    if (!req.isAdmin) return res.status(403).json({ message: "Não tem permissão para fazer este pedido." })
    marcas.inserirMarcas(req.body.marcaNome)
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

router.put("/id/:id", checkToken, (req, res) => {
    if (!req.isAdmin) return res.status(403).json({ message: "Não tem permissão para fazer este pedido." })
    marcas.updateMarcas(req.body.marcaNome, req.params.id)
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

module.exports = router;
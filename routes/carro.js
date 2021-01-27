const router = require('express').Router();
const carros = require("../controllers/CarroController")
const checkToken = require("../authentication/check-token")

router.get("/", (req, res) => {
    carros.getCarros()
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

router.get("/id/:id", (req, res) => {
    carros.getCarroById(req.params.id)
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

router.get("/:carro_id/contacto", checkToken, (req, res) => {
    carros.verContacto(req.params.carro_id, req.user.id)
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

router.post("/", checkToken, (req, res) => {
    if (req.isBuyer) return res.status(403).json({ message: "Não tem permissão para fazer este pedido." })
    carros.inserirCarro(
        req.body.marcaId, 
        req.body.modeloId, 
        req.body.descricao, 
        req.body.ano, 
        req.body.preco, 
        req.body.quilometro, 
        req.body.velocidadeMax, 
        req.body.cilindrada, 
        req.body.combustivel, 
        req.body.imagem, 
        req.body.potencia, 
        req.body.tipCaixa, 
        req.user.id
    )
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

router.get("/views/:id", checkToken, (req, res) => {
    if (req.isBuyer) return res.status(403).json({ message: "Não tem permissão para fazer este pedido." })
    carros.getViews(req.params.id)
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

router.get("/views/getViews/getTotal", checkToken, (req, res) => {
    if (!req.isAdmin) return res.status(403).json({ message: "Não tem permissão para fazer este pedido." })
    carros.getViewsTotal()
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

router.post("/imagem/id/:id", checkToken, (req, res) => {
    if (req.isBuyer) return res.status(403).json({ message: "Não tem permissão para fazer este pedido." })
    if (req.files) {
        carros.uploadPhoto(req.params.id, req.files.file)
        .then(result => res.json(result))
        .catch(err => console.log(err))
    } else {
        res.status(400).json({
            message: "É obrigatório enviar uma imagem."
        });
    }
});

router.get("/vendedor", checkToken, (req, res) => {
    if (req.isBuyer) return res.status(403).json({ message: "Não tem permissão para fazer este pedido." })
    carros.getCarrosVendedor(req.user.id)
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

module.exports = router;
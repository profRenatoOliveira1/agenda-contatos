import express from "express";
import ContatoController from "./controller/ContatoController.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ mensagem: "Aplicação online.", timestamp: `${new Date().toLocaleString('pt-br')}` });
})

router.post('/api/contato', ContatoController.novo);
router.get('/api/contato', ContatoController.todos);

export { router };
import express from "express";
import ContatoController from "./controller/ContatoController.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ mensagem: "Aplicação online.", timestamp: `${new Date().toLocaleString('pt-br')}`, info: 'ac' });
})

router.post('/api/contato', ContatoController.novo);
router.get('/api/contato', ContatoController.todos);
router.get('/api/contato/:idContato', ContatoController.contato);
router.delete('/api/contato/:idContato', ContatoController.remover);
router.put('/api/contato/:idContato', ContatoController.atualizar);

export { router };
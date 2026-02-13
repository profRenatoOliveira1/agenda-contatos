import express from "express";
import ContatoController from "./controller/ContatoController.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ mensagem: "Aplicação online.", timestamp: `${new Date().toLocaleString('pt-br')}`, info: 'ac' });
})

router.post('/api/ac_contato', ContatoController.novo);
router.get('/api/ac_contato', ContatoController.todos);
router.delete('/api/ac_contato/:idContato', ContatoController.remover);
router.put('/api/ac_contato/:idContato', ContatoController.atualizar);

export { router };
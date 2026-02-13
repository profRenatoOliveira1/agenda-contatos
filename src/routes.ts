import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ mensagem: "Aplicação online.", timestamp: `${new Date().toLocaleString('pt-br')}` });
})

export { router };
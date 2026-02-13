import express from "express";
import { DatabaseModel } from "./model/DatabaseModel.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

new DatabaseModel().testeConexao().then((resbd) => {
    if (resbd) {
        router.get('/', (req, res) => {
            res.status(200).json({ mensagem: "Aplicação online.", timestamp: `${new Date().toLocaleString('pt-br')}`, aluno: "copia" });
        })
    } else {
        console.error('Erro ao fazer conexão com o banco de dados.');
    }
});

export { router };
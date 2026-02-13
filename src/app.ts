import express from "express";
import { DatabaseModel } from "./model/DatabaseModel.js";
import dotenv from "dotenv";
import { server } from "./server.js";

dotenv.config();

const router = express.Router();
const port: number = 3333;

new DatabaseModel().testeConexao().then((resbd) => {
    if (resbd) {
        server.listen(port, () => {
            console.log(`Aplicação rodando no endereço: http://localhost:${port}`);
        })
    } else {
        console.error('Erro ao fazer conexão com o banco de dados.');
    }
});

export { router };
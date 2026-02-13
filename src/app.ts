import { server } from "./server.js";

server.listen('3333', () => {
    console.clear();
    console.log("Servidor rodando no endereço http://localhost:3333/");
});
import type { ContatoDTO } from "../interfaces/ContatoDTO.js";
import Contato from "../model/Contato.js";
import { type Request, type Response } from "express";

class ContatoController extends Contato {
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            const dadosContatoRecebido: ContatoDTO  = req.body;

            const respostaModelo = await Contato.cadastrarContato(dadosContatoRecebido);

            if(respostaModelo) {
                return res.status(201).json({ mensagem: "Contato cadastrado com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar contato." });
            }
        } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível inserir o novo contato." })
        }
    }

    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listaContatos: Array<Contato> = await Contato.listarContatos() ?? [];

            return res.status(200).json(listaContatos);
        } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível obter a lista de contatos." });
        }
    }
}

export default ContatoController;
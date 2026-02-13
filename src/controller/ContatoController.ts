import type { ContatoDTO } from "../interfaces/ContatoDTO.js";
import ContatoAC from "../model/Contato.js";
import { type Request, type Response } from "express";

class ContatoController extends ContatoAC {
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

    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idContato: number = parseInt(req.params.idContato as string);

            if(isNaN(idContato) || idContato < 0) {
                return res.status(400).json({ mensagem: "ID inválido" });
            }

            const respostaModelo = await Contato.removerContato(idContato);

            if(respostaModelo) {
                return res.status(200).json({ mensagem: "Contato removido com sucesso." });
            } else {
                return res.status(400).json({ mensagem: "Não foi possível remover o contato, verifique se as informações foram passadas corretamente." });
            }
        } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível remover o contato." });
        }
    }

    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const contato: ContatoDTO = req.body;
            contato.idContato = parseInt(req.params.idContato as string);

            if(isNaN(contato.idContato) || contato.idContato <= 0) {
                return res.status(400).json({ mensagem: "ID incorreto" });
            }

            const respostaModelo: boolean = await Contato.atualizarContato(contato);

            if (contato === null) {
                return res.status(200).json({ mensagem: "Nenhum contato encontrado com o ID fornecido" });
            }

            // Verifica se a reposta é true
            if (respostaModelo) {
                // Se sim retorna mensagem com status 200 (OK)
                return res.status(200).json({ mensagem: `Contato ${contato.idContato} atualizado com sucesso` });
            } else {
                // Em caso de erro retorna mensagem com status 400 (Erro no cliente)
                return res.status(400).json({ mensagem: "Não foi possível atualizar contato, verifique se as informações foram passadas corretamente." });
            }
        } catch (error) {
            console.error(`Erro no modelo. ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível atualizar o contato." });
        }
    }
}

export default ContatoController;
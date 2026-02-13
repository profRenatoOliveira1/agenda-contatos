import { DatabaseModel } from "./DatabaseModel.js";
import type { ContatoDTO } from "../interfaces/ContatoDTO.js";

const database = new DatabaseModel().pool;

class Contato {
    private idContato: number = 0;
    private nome: string;
    private telefone: string;
    private email: string;
    private endereco: string;
    private aniversario: Date;

    constructor(
        _nome: string,
        _telefone?: string,
        _email?: string,
        _endereco?: string,
        _aniversario?: Date
    ) {
        this.nome = _nome;
        this.telefone = _telefone || '';
        this.email = _email || '';
        this.endereco = _endereco || '';
        this.aniversario = _aniversario || new Date('1900-01-01');
    }

    // Getters
    public getIdContato(): number {
        return this.idContato;
    }

    public getNome(): string {
        return this.nome;
    }

    public getTelefone(): string {
        return this.telefone;
    }

    public getEmail(): string {
        return this.email;
    }

    public getEndereco(): string {
        return this.endereco;
    }

    public getAniversario(): Date {
        return this.aniversario;
    }

    // Setters
    public setIdContato(idContato: number): void {
        this.idContato = idContato;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    public setAniversario(aniversario: Date): void {
        this.aniversario = aniversario;
    }

    static async cadastrarContato(contato: ContatoDTO): Promise<boolean> {
        try {
            const queryInsert = `INSERT INTO contatos (nome, telefone, email, endereco, aniversario) 
                VALUES ($1, $2, $3, $4, $5) RETURNING idContato;`;

                const respostaBD = await database.query(queryInsert, [
                    contato.nome.toUpperCase(),
                    contato.telefone,
                    contato.email?.toLowerCase(),
                    contato.endereco?.toUpperCase(),
                    contato.aniversario
                ]);

                if(respostaBD.rows.length > 0) {
                    console.info(`Cliente cadastrado com sucesso. ID cliente: ${respostaBD.rows[0].idContato}`);
                    return true;
                }

                return false;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);
            return false;
        }
    }

    static async listarContatos(): Promise<Array<Contato> | null> {
        try {
            let listaContatos: Array<Contato> = [];

            const querySelectContatos = `SELECT * FROM contatos WHERE situacao=TRUE;`;

            const respostaBD = await database.query(querySelectContatos);

            respostaBD.rows.forEach((contatoDB) => {
                const novoContato = new Contato(
                    contatoDB.nome,
                    contatoDB.telefone,
                    contatoDB.email,
                    contatoDB.endereco,
                    contatoDB.aniversario
                );

                novoContato.setIdContato(contatoDB.id_contato);

                listaContatos.push(novoContato);
            });

            return listaContatos;
        } catch (error) {
            console.error(`Erro na consulta com o banco de dados. ${error}`);
            return null;   
        }
    }

    static async removerContato(idContato: number): Promise<boolean> {
        try {
            const queryRemoveContato = `UPDATE contatos SET situacao=FALSE WHERE idContato = $1;`;

            const respostaBD = await database.query(queryRemoveContato, [idContato]);

            if(respostaBD.rowCount != 0) {
                console.info(`Contato removido com sucesso.`);
                return true;
            }

            return false;
        } catch (error) {
            console.error(`Erro na consulta com o banco de dados. ${error}`);
            return false;
        }
    }

    static async atualizarContato(contato: ContatoDTO): Promise<boolean> {
        try {
            const queryUpdateContato = `UPDATE contatos SET nome=$1, telefone=$2, email=$3, endereco=$4, aniversario=$5 WHERE idContato=$6;`;

            const respostaBD = await database.query(queryUpdateContato, [
                contato.nome.toUpperCase(), 
                contato.telefone, 
                contato.email?.toLowerCase(), 
                contato.endereco?.toUpperCase(), 
                contato.aniversario, 
                contato.idContato
            ]);

            if(respostaBD.rowCount != 0) {
                console.info(`Contato atualizado com sucesso. ID: ${contato.idContato}`);
                return true;
            }

            return false;
        } catch (error) {
            console.error(`Erro na consulta com o banco de dados. ${error}`);
            return false;
        }
    }
}

export default Contato;
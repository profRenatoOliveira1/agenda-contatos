import { DatabaseModel } from "./DatabaseModel.js";
import type { ContatoDTO } from "../interfaces/ContatoDTO.js";

const database = new DatabaseModel().pool;

class Contato {
    private id_contato: number = 0;
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
        return this.id_contato;
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
        this.id_contato = idContato;
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
                VALUES ($1, $2, $3, $4, $5) RETURNING id_contato;`;

                const respostaBD = await database.query(queryInsert, [
                    contato.nome.toUpperCase(),
                    contato.telefone,
                    contato.email?.toLowerCase(),
                    contato.endereco?.toUpperCase(),
                    contato.aniversario
                ]);

                if(respostaBD.rows.length > 0) {
                    console.info(`Cliente cadastrado com sucesso. ID cliente: ${respostaBD.rows[0].id_contato}`);
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

            const querySelectContatos = `SELECT * FROM contatos;`;

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
}

export default Contato;
import { DatabaseModel } from "./DatabaseModel.js";

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

}

export default Contato;
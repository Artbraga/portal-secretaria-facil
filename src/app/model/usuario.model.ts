import { Perfil } from './perfil.model';

export class Usuario {
    id: number;
    nome: string;
    login: string;
    senha: string;
    telefone: string;
    email: string;
    perfil: Perfil;
    dataExpiracao: Date;

    constructor() {
        this.id = null;
        this.nome = null;
        this.login = null;
        this.senha = null;
        this.telefone = null;
    }
}

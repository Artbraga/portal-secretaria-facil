import { Perfil } from './perfil.model';

export class Usuario {
    Id: number;
    Nome: string;
    Login: string;
    Senha: string;
    Telefone: string;
    Email: string;
    Perfil: Perfil;
}

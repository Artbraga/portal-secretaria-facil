import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from './base.service';
import { Usuario } from 'src/app/model/usuario.model';
import { map } from 'rxjs/operators';
import jwt_decode from "jwt-decode";

@Injectable({ providedIn: 'root', })
export class UsuarioService extends BaseService<Usuario> {
    constructor(http: HttpClient) {
        super(http, 'Usuario');
    }

    get nomeUsuario(): string {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token)
        return decoded['unique_name'];
    }

    get perfilUsuario(): string {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token)
        return decoded['role'][0];
    }

    get permissoesUsuario(): string {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token)
        return decoded['role'].slice(1);
    }

    get expiracaoSessao(): Date {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token)
        return new Date(decoded['exp'] * 1000);
    }

    public deslogar() {
        localStorage.removeItem('token');
    }

    public logarPortal(usuario: Usuario): Observable<any> {
        const url = this.baseURL + '/LogarPortal';

        return this.http.post(url, usuario, {responseType: "text"})
        .pipe(map(token => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', token);
            this.usuarioLogado();
        }));
    }

    public usuarioLogado(): boolean {
        let token = localStorage.getItem('token');
        if (token == null) return false;
        if (this.expiracaoSessao < new Date()) {
            this.deslogar();
            return false;
        }
        else {
            return true;
        }
    }
}

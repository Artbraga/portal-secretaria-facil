import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from './base.service';
import { Usuario } from 'src/app/model/usuario.model';
import { map } from 'rxjs/operators';
import jwt_decode from "jwt-decode";

@Injectable({ providedIn: 'root', })
export class UsuarioService extends BaseService<Usuario> {
    usuario: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(null);
    constructor(http: HttpClient) {
        super(http, 'Usuario');
    }

    public deslogar() {
        this.usuario.next(null);
        localStorage.removeItem('token');
    }

    public logar(usuario: Usuario): Observable<any> {
        const url = this.baseURL + '/BuscarUsuarioPorLoginESenha';

        return this.http.post<string>(url, usuario)
        .pipe(map(token => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', token);
            this.usuarioLogado();
        }));
    }

    public usuarioLogado(): boolean {
        let token = localStorage.getItem('token');
        const user = Object.assign(new Usuario(), jwt_decode(token));
        if (user.dataExpiracao < new Date()) {
            this.deslogar();
            return false;
        }
        else {
            this.usuario.next(user);
            return true;
        }
    }
}

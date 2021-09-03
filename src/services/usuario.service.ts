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

    public buscarUsuarioLogado(): Usuario {
        return this.usuario.value;
    }

    public deslogar() {
        this.usuario.next(null);
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
        const decoded = jwt_decode(token)
        const user = Object.assign(new Usuario(), JSON.parse(decoded["Usuario"]));
        if (new Date(decoded['exp'] * 1000) < new Date()) {
            this.deslogar();
            return false;
        }
        else {
            if (this.usuario.value == null)
                this.usuario.next(user);
            return true;
        }
    }
}

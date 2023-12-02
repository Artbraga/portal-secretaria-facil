import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormularioComponent } from 'src/app/components/base-formulario.component';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

    usuario = new Usuario();
    error: boolean
    errorMessage: string;
    constructor(private usuarioService: UsuarioService, 
                private router: Router, 
                private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            if (params.expiration) {
                this.error = true;
                this.errorMessage = "Sua sessão expirou.";
            }
        });
    }

    login() {
        if (this.validar()) {
            this.usuarioService.logarPortal(this.usuario).subscribe(data => {
                this.router.navigate(['']);
            },
            err => {
                this.error = true;
                this.errorMessage = err.error;
            });
        }
    }

    esqueciSenha() {
        console.log("Esqueci a senha.")
    }

    validar(): boolean {
        if (this.usuario.Login == null || this.usuario.Login.length == 0 ||
            this.usuario.Senha == null || this.usuario.Senha.length == 0) {
            this.errorMessage = "Digite seu login e senha.";
            this.error = true;
            return false;
        }
        return true;
    }
}

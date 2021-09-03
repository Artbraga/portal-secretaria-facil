import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormularioComponent } from 'src/app/components/base-formulario.component';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormularioComponent<Usuario>  {

    usuario: Usuario;
    constructor(private usuarioService: UsuarioService, private router: Router) {
        super(new Usuario());
    }

    login() {
        if (this.validar()) {
            this.usuarioService.logarPortal(this.element).subscribe(data => {
                this.router.navigate(['']);
            });
        }
    }

    esqueciSenha() {
        console.log("Esqueci a senha.")
    }

    validar(): boolean {
        return this.stringValida(this.element.Login) && this.stringValida(this.element.Senha);
    }

}

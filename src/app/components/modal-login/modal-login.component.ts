import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario.model';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from 'src/services/usuario.service';
import { environment } from 'src/environments/environment';
import { BaseFormularioComponent } from '../base-formulario.component';

@Component({
    selector: 'app-modal-login',
    templateUrl: './modal-login.component.html',
    styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent extends BaseFormularioComponent<Usuario>  {

    usuario: Usuario;
    constructor(private usuarioService: UsuarioService,
                private dialogRef: MatDialogRef<ModalLoginComponent>) {
        super(new Usuario());
        // if (environment.loginAutomatico) {
        //     this.element.login = 'admin';
        //     this.element.senha = 'admin';
        //     this.login();
        // }
    }

    login() {
        if (this.validar()) {
            this.usuarioService.logar(this.element).subscribe(data => {
                this.element = Object.assign(new Usuario(), data);
                this.dialogRef.close(data);
            });
        }
    }

    validar(): boolean {
        return this.stringValida(this.element.login) && this.stringValida(this.element.senha);
    }

}

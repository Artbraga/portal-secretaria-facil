import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/services/usuario.service';
import { Usuario } from './model/usuario.model';
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    get usuarioLogado(): Usuario {
        const usr = this.usuarioService.buscarUsuarioLogado();
        console.log(usr);
        return usr;
    }

    constructor(private usuarioService: UsuarioService,
        private router: Router,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        public dialog: MatDialog) {
        this.matIconRegistry.addSvgIcon('logout', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logout.svg'));
    }

    ngOnInit(): void {
        this.usuarioService.usuarioLogado();
    }

    logout() {
        this.router.navigate([{ outlets: { secondRouter: null } }]).then(() => {
            this.router.navigate(['entrar']).then(() => {
                this.usuarioService.deslogar();
            });
        });
    }
}

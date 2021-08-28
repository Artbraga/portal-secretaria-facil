import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/services/usuario.service';
import { Usuario } from './model/usuario.model';
import { MatIconRegistry } from '@angular/material/icon';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public usuario$: Observable<Usuario>;
    constructor(private usuarioService: UsuarioService,
                private matIconRegistry: MatIconRegistry,
                private domSanitizer: DomSanitizer,
                public dialog: MatDialog) {
        this.usuario$ = usuarioService.usuario.asObservable();
        this.usuario$.subscribe(usr => {
            if (usr == null && this.usuarioService.usuarioLogado()) {
                this.logar();
            }
        });
        this.matIconRegistry.addSvgIcon('logout', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logout.svg'));
    }

    logar() {
        const dialogRef = this.dialog.open(ModalLoginComponent, {
            width: '50vw',
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {});
    }
}

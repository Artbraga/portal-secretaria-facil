import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { UsuarioService } from 'src/services/usuario.service';
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConsultarTurmas } from './model/enums/permissoes';
import { PerfilEnum } from './model/enums/perfil.enum';
import { TurmaService } from 'src/services/turma.service';
import { Turma } from './model/turma.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    get tempoSessao(): number {
        return (this.usuarioService.expiracaoSessao.getTime()/1000) - (new Date().getTime()/1000);
    }
    get nomeUsuario(): string {
        return this.usuarioService.nomeUsuario;
    }

    get usuarioLogado(): boolean {
        return this.usuarioService.usuarioLogado();
    }

    get production(): boolean {
        return environment.production;
    }

    turmas: Turma[] = [];

    constructor(private usuarioService: UsuarioService,
        private turmaService: TurmaService,
        private router: Router,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        public dialog: MatDialog) {
        this.matIconRegistry.addSvgIcon('logout', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logout.svg'));
    }

    ngOnInit(): void {
        this.usuarioService.usuarioLogado();
        if (this.usuarioAluno()) {
            this.turmaService.listarTurmasPortal().subscribe(x => {
                this.turmas = x;
            })
        }
    }

    logout() {
        this.router.navigate([{ outlets: { secondRouter: null } }]).then(() => {
            this.router.navigate(['entrar']).then(() => {
                this.usuarioService.deslogar();
            });
        });
    }

    usuarioProfessor(): boolean {
        return this.usuarioService.usuarioPossuiPermissao(ConsultarTurmas);
    }

    usuarioAluno(): boolean {
        return this.usuarioService.perfilUsuario == PerfilEnum.Aluno.name;
    }
 }

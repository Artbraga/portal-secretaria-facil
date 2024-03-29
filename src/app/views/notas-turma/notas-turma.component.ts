import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BaseFormularioComponent } from 'src/app/components/base-formulario.component';
import { Coluna } from 'src/app/components/base-table';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { AlunoNotas } from 'src/app/model/aluno-notas.model';
import { Disciplina } from 'src/app/model/disciplina.model';
import { RotaVoltarParameter, IdTurmaParameter } from 'src/app/model/enums/constants';
import { Turma } from 'src/app/model/turma.model';
import { AlunoService } from 'src/services/aluno.service';
import { DisciplinaService } from 'src/services/disciplina.service';
import { RoutingService } from 'src/services/routing.service';
import { TurmaService } from 'src/services/turma.service';

import { AdicionarNotaComponent } from './adicionar-nota/adicionar-nota.component';

@Component({
    selector: 'app-notas-turma',
    templateUrl: './notas-turma.component.html',
    styleUrls: ['./notas-turma.component.scss']
})
export class NotasTurmaComponent extends BaseFormularioComponent<any> implements OnInit {

    turma: Turma;
    columns: Coluna[] = [];
    list: { [id: string]: string }[] = [];
    rotaVoltar: string = null;
    disciplinas: Disciplina[];
    alunos: AlunoNotas[];

    constructor(private alunoService: AlunoService,
                private turmaService: TurmaService,
                private disciplinaService: DisciplinaService,
                private routingService: RoutingService,
                private notificationService: NotificationService,
                private router: Router,
                public dialog: MatDialog) {
        super(null);
    }

    ngOnInit(): void {
        this.rotaVoltar = this.routingService.excluirValor(RotaVoltarParameter);
        this.id = this.routingService.excluirValor(IdTurmaParameter) as number;
        if (this.id != null) {
            this.turmaService.getById(this.id).subscribe(data => {
                this.turma = Object.assign(new Turma(), data);
                this.carregarTabela();
            });
        } else {
            this.router.navigate([{ outlets: { secondRouter: null } }])
            .then(() => this.router.navigate(['turma']));
        }
    }

    carregarTabela() {
        this.columns = [];
        this.list = [];
        this.columns.push({ key: 'nome', header: 'Aluno', field: 'nomeAluno' } as Coluna);
        this.columns.push({ key: 'matricula', header: 'Matrícula', field: 'matricula' } as Coluna);
        forkJoin([
            this.disciplinaService.listarDisciplinasDeUmCurso(this.turma.curso.id),
            this.alunoService.buscarAlunosENotasDeTurma(this.turma.id)
        ]).subscribe(([disciplinas, alunos]) => {
            this.disciplinas = disciplinas;
            this.alunos = alunos;

            disciplinas.forEach(d => {
                this.columns.push({ key: d.nome, header: d.nome, field: d.nome } as Coluna);
            });
            alunos.forEach(al => {
                const obj: { [id: string]: string } = {};
                obj.nomeAluno = al.nomeAluno;
                obj.matricula = al.matricula;
                disciplinas.forEach(d => {
                    const nota = al.notas.find(x => x.disciplinaId === d.id);
                    if (nota != null) {
                        obj[d.nome] = nota.valorNota.toString();
                    } else {
                        obj[d.nome] = '';
                    }
                });
                this.list.push(obj);
            });
        });
    }

    adicionar() {
        const dialogRef = this.dialog.open(AdicionarNotaComponent, {
            data: { alunos: this.alunos, disciplinas: this.disciplinas, turmaId: this.id },
            maxHeight: '95vh'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.carregarTabela();
            }
        });
    }

    voltar() {
        this.routingService.salvarValor(IdTurmaParameter, this.id);
        this.router.navigate([this.rotaVoltar]);
    }

    validar(): boolean {
        throw new Error('Method not implemented.');
    }
}

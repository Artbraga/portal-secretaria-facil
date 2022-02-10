import { Component, OnInit } from '@angular/core';
import { AlunoService } from 'src/services/aluno.service';
import { RoutingService } from 'src/services/routing.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { Coluna, ColumnGroup } from 'src/app/components/base-table';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { NotificationType } from 'src/app/components/notification/toaster/toaster';
import { Aluno } from 'src/app/model/aluno.model';
import { IdAlunoParameter, RotaVoltarParameter, HomeRoute, FichaTurmaRoute, IdTurmaParameter, FichaAlunoRoute, ConsultarTurmaRoute } from 'src/app/model/enums/constants';
import { TipoStatusAlunoEnum } from 'src/app/model/enums/tipo-status-aluno.enum';
import { NotaAluno } from 'src/app/model/nota-aluno.model';
import { RegistroAluno } from 'src/app/model/registro-aluno.model';
import { TurmaAluno } from 'src/app/model/turma-aluno.model';
import { BaixarArquivoService } from 'src/services/application-services/baixarArquivo.service';
import { DisciplinaService } from 'src/services/disciplina.service';
import { NotaAlunoService } from 'src/services/nota-aluno.service';
import { RegistroAlunoComponent } from './registro-aluno/registro-aluno.component';


@Component({
    selector: 'ficha-aluno',
    templateUrl: './ficha-aluno.component.html',
    styleUrls: ['./ficha-aluno.component.scss'],
    animations: [
        trigger('detailExpand', [
            state(
                'collapsed',
                style({ height: '0px', minHeight: '0', display: 'none' })
            ),
            state('expanded', style({ height: '*' })),
            transition(
                'expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
            )
        ])
    ]
})
export class FichaAlunoComponent implements OnInit {
    rotaVoltar: string;
    element: Aluno;
    imagem: any;
    columnsRegistro: Coluna[] = [];
    columnsTurma: Coluna[] = [];
    expandedTurma: TurmaAluno[] = [];
    changeIconTurma: boolean[] = [];
    columnGroupsTurma: ColumnGroup[] = [
        { keyGroup: 'table', groupHasBody: true, groupHasHeader: true },
        {
            keyGroup: 'expandGroupping',
            groupHasBody: true,
            groupHasHeader: false,
            groupBodyClass: 'detail-row'
        }
    ];

    idAluno: number;

    constructor(
        private alunoService: AlunoService,
        private notaAlunoService: NotaAlunoService,
        private disciplinaService: DisciplinaService,
        private notificationService: NotificationService,
        private routingService: RoutingService,
        private router: Router,
        public dialog: MatDialog) {
        this.element = new Aluno();
        this.columnsRegistro.push({ key: 'data', header: 'Data', field: 'dataStr' } as Coluna);
        this.columnsRegistro.push({ key: 'registro', header: 'Registro', field: 'registro', addTooltip: true, tooltipMinSize: 150 } as Coluna);
        this.columnsRegistro.push({ key: 'buttons', bodyTemplateName: 'acoesTemplate' } as Coluna);

        this.columnsTurma.push({ key: 'expand', groupKey: 'table', bodyTemplateName: 'expand' } as Coluna);
        this.columnsTurma.push({ key: 'curso', header: 'Curso', groupKey: 'table', field: 'turma.curso.nome' } as Coluna);
        this.columnsTurma.push({ key: 'turma', header: 'Turma', groupKey: 'table', field: 'turma.codigo' } as Coluna);
        this.columnsTurma.push({ key: 'horario', header: 'Turma', groupKey: 'table', field: 'turma.horarioCompleto' } as Coluna);
        this.columnsTurma.push({ key: 'matricula', header: 'Matricula', groupKey: 'table', field: 'matricula' } as Coluna);
        this.columnsTurma.push({ key: 'status', header: 'Situação', groupKey: 'table', field: 'tipoStatusAluno' } as Coluna);
        this.columnsTurma.push({ key: 'buttons', groupKey: 'table', bodyTemplateName: 'acoesTemplate' } as Coluna);
        this.columnsTurma.push({ key: 'expandedDetail', classBody: 'rowexpansion', colspan: 7, groupKey: 'expandGroupping', bodyTemplateName: 'expandedDetailTemplate' } as Coluna);
    }

    ngOnInit(): void {
        this.rotaVoltar = this.routingService.excluirValor(RotaVoltarParameter);

        if (this.routingService.possuiValor(IdAlunoParameter)) {
            this.idAluno = this.routingService.excluirValor(IdAlunoParameter) as number;

            this.carregarAluno();
            this.alunoService.buscarImagem(this.idAluno).subscribe(data => {
                if (data != null && data.size > 0) {
                    const blob = new Blob([data], { type: 'image/png' });
                    const reader = new FileReader();

                    reader.addEventListener('load', (event: any) => {
                        this.imagem = event.target.result;
                    });
                    reader.readAsDataURL(blob);
                }
            });
        }
    }

    carregarAluno() {
        this.alunoService.getById(this.idAluno).subscribe((data) => {
            this.element = Object.assign(new Aluno(), data);
            this.element.corrigirInformacoes();
        });
        this.expandedTurma = [];
        this.changeIconTurma = [];
    }

    voltar() {
        this.router.navigate([this.rotaVoltar]);
    }

    tratarString(str: string, tst = null): string {
        if (tst) {
            console.log(tst);
            console.log(str);
        }
        if (str != null && str != '') {
            return str.toString();
        }
        return '---';
    }

    getCampo(campo: string, aluno: Aluno): string {
        if (aluno != null) {
            switch (campo) {
                case 'sexo':
                    return aluno.sexo === 'm' ? 'Masculino' : 'Feminino';
            }
        }
        return '---';
    }

    concluido(turmaAluno: TurmaAluno): boolean {
        return turmaAluno.tipoStatusAluno == TipoStatusAlunoEnum.Concluido.name;
    }

    abrirFichaTurma(turmaAluno: TurmaAluno) {
        this.routingService.salvarValor(IdTurmaParameter, turmaAluno.turma.id);
        this.routingService.salvarValor(RotaVoltarParameter, FichaAlunoRoute);
        this.router.navigate([FichaTurmaRoute]);
    }
    
    adicionarRegistro() {
        const dialogRef = this.dialog.open(RegistroAlunoComponent, {
            data: this.element
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                this.alunoService.adicionarRegistro(result).subscribe(data => {
                    if (data) {
                        this.notificationService.addNotification('Sucesso!', 'Registro adicionado.', NotificationType.Success);
                        this.carregarAluno();
                    }
                });
            }
        });
    }

    excluirRegistro(registro: RegistroAluno) {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja excluir o registro?` }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.alunoService.excluirRegistro(registro.id).subscribe(data => {
                    if (data) {
                        this.notificationService.addNotification('Sucesso!', 'Registro excluído.', NotificationType.Success);
                        this.carregarAluno();
                    }
                });
            }
        });
    }

    expandTable(element: TurmaAluno) {
        const index = this.element.turmasAluno.indexOf(element);
        if (this.expandedTurma.includes(element)) {
            this.expandedTurma = this.expandedTurma.filter(x => x !== element);
            this.changeIconTurma[index] = false;
        } else {
            this.expandedTurma = this.expandedTurma.concat([element]);
            this.changeIconTurma[index] = true;
            if (element.notas == null || element.notas.length == 0) {
                forkJoin([
                    this.disciplinaService.listarDisciplinasDeUmCurso(element.turma.curso.id),
                    this.notaAlunoService.listarNotasDeUmAluno(this.element.id)
                ]).subscribe(([disciplinas, notas]) => {
                    const notasCurso = [];
                    disciplinas.forEach(d => {
                        let nota = notas.find(x => x.disciplinaId === d.id);
                        if (nota == null) {
                            nota = new NotaAluno();
                            nota.disciplina = d;
                            nota.disciplinaId = d.id;
                        } else {
                            nota.disciplina = d;
                            nota.valorNota = parseFloat(nota.valorNota.toString().replace(',', '.'));
                        }
                        notasCurso.push(nota);
                    });
                    element.notas = notasCurso;
                });
            }
        }
    }
}

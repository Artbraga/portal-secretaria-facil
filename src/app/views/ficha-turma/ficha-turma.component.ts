import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ColumnGroup, Coluna } from 'src/app/components/base-table';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { NotificationType } from 'src/app/components/notification/toaster/toaster';
import { PageTableResult } from 'src/app/components/page-table-result';
import { RegistroTurmaComponent } from 'src/app/components/registro-turma/registro-turma.component';
import { Aluno } from 'src/app/model/aluno.model';
import { ConsultarTurmaRoute, FichaAlunoRoute, FichaTurmaRoute, IdAlunoParameter, IdTurmaParameter, NotasTurmaRoute, RotaVoltarParameter } from 'src/app/model/enums/constants';
import { ConsultarAlunos, ManterNotas } from 'src/app/model/enums/permissoes';
import { TipoStatusAlunoEnum } from 'src/app/model/enums/tipo-status-aluno.enum';
import { FiltroAluno } from 'src/app/model/filter/aluno.filter';
import { NotaAluno } from 'src/app/model/nota-aluno.model';
import { Professor } from 'src/app/model/professor.model';
import { RegistroTurma } from 'src/app/model/registro-turma.model';
import { TurmaAluno } from 'src/app/model/turma-aluno.model';
import { TurmaProfessor } from 'src/app/model/turma-professor.model';
import { Turma } from 'src/app/model/turma.model';
import { AlunoService } from 'src/services/aluno.service';
import { DisciplinaService } from 'src/services/disciplina.service';
import { NotaAlunoService } from 'src/services/nota-aluno.service';
import { RoutingService } from 'src/services/routing.service';
import { TurmaService } from 'src/services/turma.service';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
    selector: 'app-ficha-turma',
    templateUrl: './ficha-turma.component.html',
    styleUrls: ['./ficha-turma.component.scss'],
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
export class FichaTurmaComponent implements OnInit {

    element: Turma = new Turma();
    id: number;
    rotaVoltar: string = null;
    columnsRegistro: Coluna[] = [];
    columnsProfessor: Coluna[] = [];
    columnsAluno: Coluna[] = [];
    columnGroupsAluno: ColumnGroup[] = [
        { keyGroup: 'table', groupHasBody: true, groupHasHeader: true },
        {
            keyGroup: 'expandGroupping',
            groupHasBody: true,
            groupHasHeader: false,
            groupBodyClass: 'detail-row'
        }
    ];


    alunosPageList = new PageTableResult<Aluno>();
    expandedAluno: Aluno[] = [];
    changeIconAluno: boolean[] = [];
    constructor(
        private turmaService: TurmaService,
        private alunoService: AlunoService,
        private usuarioService: UsuarioService,
        private disciplinaService: DisciplinaService,
        private notaAlunoService: NotaAlunoService,
        private notificationService: NotificationService,
        private routingService: RoutingService,
        private router: Router,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.id = this.routingService.excluirValor(IdTurmaParameter) as number;
        if (this.routingService.possuiValor(RotaVoltarParameter)) 
            this.rotaVoltar = this.routingService.excluirValor(RotaVoltarParameter);
        else 
            this.rotaVoltar = ConsultarTurmaRoute;
        this.carregarTurma();

        this.columnsRegistro.push({ key: 'data', header: 'Data', field: 'dataStr' } as Coluna);
        this.columnsRegistro.push({ key: 'registro', header: 'Registro', field: 'registro' } as Coluna);
        this.columnsRegistro.push({ key: 'buttons', bodyTemplateName: 'acoesTemplate' } as Coluna);

        this.columnsProfessor.push({ key: 'nome', header: 'Nome', field: 'professor.nome' } as Coluna);
        this.columnsProfessor.push({ key: 'buttons', bodyTemplateName: 'acoesTemplate' } as Coluna);

        this.columnsAluno.push({ key: 'expand', groupKey: 'table', bodyTemplateName: 'expand' } as Coluna);
        this.columnsAluno.push({ key: 'nome', groupKey: 'table', header: 'Nome', field: 'nome' } as Coluna);
        this.columnsAluno.push({ key: 'celular', groupKey: 'table', header: 'Celular', field: 'celular' } as Coluna);
        this.columnsAluno.push({ key: 'email', groupKey: 'table', header: 'E-mail', field: 'email' } as Coluna);
        this.columnsAluno.push({ key: 'status', groupKey: 'table', header: 'Status', field: 'tipoStatusAluno' } as Coluna);
        this.columnsAluno.push({ key: 'buttons', groupKey: 'table', bodyTemplateName: 'acoesTemplate' } as Coluna);
        this.columnsAluno.push({ key: 'expandedDetail', classBody: 'rowexpansion', colspan: 7, groupKey: 'expandGroupping', bodyTemplateName: 'expandedDetailTemplate' } as Coluna);
   }

    voltar() {
        this.router.navigate([ConsultarTurmaRoute]);
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

    adicionarRegistro() {
        const dialogRef = this.dialog.open(RegistroTurmaComponent, {
            data: this.element
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                this.turmaService.adicionarRegistro(result).subscribe(data => {
                    if (data) {
                        this.notificationService.addNotification('Sucesso!', 'Registro adicionado.', NotificationType.Success);
                        this.carregarTurma();
                    }
                });
            }
        });
    }

    excluirRegistro(registro: RegistroTurma) {
        const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
            data: { mensagem: `Deseja excluir o registro?` }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.turmaService.excluirRegistro(registro.id).subscribe(data => {
                    if (data) {
                        this.notificationService.addNotification('Sucesso!', 'Registro excluído.', NotificationType.Success);
                        this.carregarTurma();
                    }
                });
            }
        });
    }

    carregarTurma() {
        this.turmaService.getById(this.id).subscribe(data => {
            this.element = Object.assign(new Turma(), data);
            this.element.registros = this.element.registros.map(reg => {
                reg = Object.assign(new RegistroTurma(), reg);
                reg.ajustarDatas();
                return reg;
            });
            this.element.ajustarDatas();
            this.carregarProfessoresDaTurma();
            this.carregarAlunosDaTurma();
        });
    }

    carregarProfessoresDaTurma() {
        this.turmaService.buscarProfessoresDaTurma(this.id).subscribe(data => {
            this.element.professores = data.map(x => {
                const turmaProfessor = Object.assign(new TurmaProfessor(), x);
                turmaProfessor.professor = Object.assign(new Professor(), x.professor);
                return turmaProfessor;
            });
        });
    }

    carregarAlunosDaTurma() {
        const filtro = new FiltroAluno();
        filtro.codigoTurma = this.element.codigo;
        this.alunoService.pesquisarAlunos(filtro).subscribe(data => {
            this.alunosPageList = data;
            this.alunosPageList.lista = data.lista.map(x => Object.assign(new Aluno(), x));
        });
    }

    adicionarNotas() {
        this.routingService.salvarValor(IdTurmaParameter, this.id);
        this.routingService.salvarValor(RotaVoltarParameter, FichaTurmaRoute);
        this.router.navigate([NotasTurmaRoute]);
    }

    expandTable(aluno: Aluno) {
        const index = this.alunosPageList.lista.indexOf(aluno);
        if (this.expandedAluno.includes(aluno)) {
            this.expandedAluno = this.expandedAluno.filter(x => x !== aluno);
            this.changeIconAluno[index] = false;
        } else {
            this.expandedAluno = this.expandedAluno.concat([aluno]);
            this.changeIconAluno[index] = true;
            if (this.getTurmaAluno(aluno).notas == null || this.getTurmaAluno(aluno).notas.length == 0)
            {
                forkJoin([
                    this.disciplinaService.listarDisciplinasDeUmCurso(this.element.curso.id),
                    this.notaAlunoService.listarNotasDeUmAluno(aluno.id)
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
                    this.getTurmaAluno(aluno).notas = notasCurso;
                });
            }
        }
    }

    getTurmaAluno(aluno: Aluno): TurmaAluno {
        return aluno.turmasAluno.find(x => x.turma.id == this.element.id);
    }

    concluido(turmaAluno: TurmaAluno): boolean {
        return turmaAluno.tipoStatusAluno == TipoStatusAlunoEnum.Concluido.name;
    }

    podeAdicionarNotas() {
        return this.usuarioService.usuarioPossuiPermissao(ManterNotas);
    }

    podeConsultarAlunos() {
        return this.usuarioService.usuarioPossuiPermissao(ConsultarAlunos);
    }

    visualizarAluno(element: Aluno) {
        this.routingService.salvarValor(IdAlunoParameter, element.id);
        this.routingService.salvarValor(IdTurmaParameter, this.id);
        this.routingService.salvarValor(RotaVoltarParameter, FichaTurmaRoute);
        this.router.navigate([FichaAlunoRoute]);
    }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseTable, Coluna } from 'src/app/components/base-table';
import { ConsultarTurmaRoute, FichaTurmaRoute, IdTurmaParameter, RotaVoltarParameter } from 'src/app/model/enums/constants';
import { Turma } from 'src/app/model/turma.model';
import { RoutingService } from 'src/services/routing.service';
import { TurmaService } from 'src/services/turma.service';

@Component({
    selector: 'app-tabela-turma',
    templateUrl: './tabela-turma.component.html',
    styleUrls: ['./tabela-turma.component.scss']
})
export class TabelaTurmaComponent extends BaseTable<Turma> implements OnInit {

    constructor(private turmaService: TurmaService,
        private routingService: RoutingService,
        private router: Router) {
        super();
    }

    ngOnInit() {
        this.turmaService.listarTurmasPortal().subscribe(data => {
            this.list = data.map(x => {
                const turma = Object.assign(new Turma(), x);
                turma.ajustarDatas();
                return turma;
            });
        });
        this.columns.push({ key: 'codigo', header: 'Código', field: 'codigo' } as Coluna);
        this.columns.push({ key: 'curso', header: 'Curso', field: 'curso.nome' } as Coluna);
        this.columns.push({ key: 'dia', header: 'Dias da Semana', field: 'diasDaSemana' } as Coluna);
        this.columns.push({ key: 'horario', header: 'Horário', field: 'horario' } as Coluna);
        this.columns.push({ key: 'inicio', header: 'Início', field: 'dataInicioStr' } as Coluna);
        this.columns.push({ key: 'status', header: 'Situação', field: 'status' } as Coluna);
        this.columns.push({ key: 'buttons', bodyTemplateName: 'acoesTemplate' } as Coluna);
    }

    abrirFichaTurma(turma: Turma) {
        this.routingService.salvarValor(IdTurmaParameter, turma.id);
        this.routingService.salvarValor(RotaVoltarParameter, ConsultarTurmaRoute);
        this.router.navigate([FichaTurmaRoute]);
    }
}

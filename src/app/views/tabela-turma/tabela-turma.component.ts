import { Component, OnInit } from '@angular/core';
import { BaseTable, Coluna } from 'src/app/components/base-table';
import { Turma } from 'src/app/model/turma.model';
import { TurmaService } from 'src/services/turma.service';

@Component({
    selector: 'app-tabela-turma',
    templateUrl: './tabela-turma.component.html',
    styleUrls: ['./tabela-turma.component.scss']
})
export class TabelaTurmaComponent extends BaseTable<Turma> implements OnInit {

    constructor(private turmaService: TurmaService) {
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

}

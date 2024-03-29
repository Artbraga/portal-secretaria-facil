import { BaseConverter } from '../components/base-converter';
import { Curso } from './curso.model';
import { RegistroTurma } from './registro-turma.model';
import { TurmaProfessor } from './turma-professor.model';

export class Turma {
    id: number;
    codigo: string;
    diasDaSemana: string;
    horaInicio: string;
    horaFim: string;
    status: string;
    dataInicio: Date;
    dataFim: Date;
    registros: RegistroTurma[];
    professores: TurmaProfessor[];
    curso: Curso;

    get dataInicioStr(): string {
        return BaseConverter.DateToStringOnlyDate(this.dataInicio);
    }

    get dataFimStr(): string {
        return BaseConverter.DateToStringOnlyDate(this.dataFim);
    }

    get horarioCompleto(): string {
        return `${this.diasDaSemana} das ${this.horario}`;
    }

    get horario(): string {
        return this.horaInicio + ' - ' + this.horaFim;
    }

    ajustarDatas() {
        this.dataInicio = BaseConverter.StringToDate(this.dataInicio.toString());
        this.dataFim = this.dataFim == null ? null : BaseConverter.StringToDate(this.dataFim.toString());
    }

    constructor() {
        this.codigo = null;
        this.diasDaSemana = null;
        this.horaInicio = null;
        this.horaFim = null;
        this.dataInicio = null;
        this.dataFim = null;
        this.registros = [];
        this.professores = [];
    }
}

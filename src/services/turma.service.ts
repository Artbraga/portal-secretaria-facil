import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RegistroTurma } from "src/app/model/registro-turma.model";
import { TurmaAluno } from "src/app/model/turma-aluno.model";
import { TurmaProfessor } from "src/app/model/turma-professor.model";
import { Turma } from "src/app/model/turma.model";
import { BaseService } from "./base.service";

@Injectable({ providedIn: 'root', })
export class TurmaService extends BaseService<Turma> {

    constructor(http: HttpClient) {
        super(http, 'Turma');
    }

    public listarTurmasPortal(): Observable<Turma[]> {
        const url = this.baseURL + `/ListarTurmasPortal`;

        return this.http.get<Turma[]>(url);
    }

    public buscarProfessoresDaTurma(id: number): Observable<TurmaProfessor[]> {
        const url = this.baseURL + '/BuscarProfessoresDeUmaTurma/' + id;

        return this.http.get<TurmaProfessor[]>(url);
    }

    // registro
    public adicionarRegistro(registro: RegistroTurma): Observable<boolean> {
        const url = this.baseURL + `/AdicionarRegistro`;

        return this.http.post<boolean>(url, registro);
    }

    public excluirRegistro(id: number): Observable<boolean> {
        const url = this.baseURL + '/ExcluirRegistro/' + id;

        return this.http.delete<boolean>(url);
    }
}
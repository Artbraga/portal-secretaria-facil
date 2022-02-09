import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { AlunoNotas } from 'src/app/model/aluno-notas.model';
import { Observable } from 'rxjs';
import { Aluno } from 'src/app/model/aluno.model';
import { FiltroAluno } from 'src/app/model/filter/aluno.filter';
import { PageTableResult } from 'src/app/components/page-table-result';


@Injectable({ providedIn: 'root', })
export class AlunoService extends BaseService<Aluno> {

    constructor(http: HttpClient) {
        super(http, 'Aluno');
    }

    buscarAlunosENotasDeTurma(turmaId: number): Observable<AlunoNotas[]> {
        const url = this.baseURL + `/BuscarAlunosENotasDeTurma/${turmaId}`;

        return this.http.get<AlunoNotas[]>(url);
    }

    pesquisarAlunos(filtro: FiltroAluno): Observable<PageTableResult<Aluno>> {
        const url = this.baseURL + `/FiltrarAlunos`;

        return this.http.post<PageTableResult<Aluno>>(url, filtro);
    }
}

import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { AlunoNotas } from 'src/app/model/aluno-notas.model';
import { Observable } from 'rxjs';
import { Aluno } from 'src/app/model/aluno.model';
import { FiltroAluno } from 'src/app/model/filter/aluno.filter';
import { PageTableResult } from 'src/app/components/page-table-result';
import { RegistroAluno } from 'src/app/model/registro-aluno.model';


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

    salvarImagem(id: number, imagemPerfil: File): Observable<boolean> {
        const url: string = this.baseURL + '/SalvarImagemAluno';

        const formData = new FormData();
        formData.append('imagemPerfil', imagemPerfil);
        formData.append('idAluno', id.toString());

        return this.http.post<boolean>(url, formData);
    }

    buscarImagem(id: number): Observable<Blob> {
        const url = this.baseURL + `/BuscarImagemAluno/${id}`;

        return this.http.get(url, { responseType: 'blob' });
    }

    // registro
    public adicionarRegistro(registro: RegistroAluno): Observable<boolean> {
        const url = this.baseURL + `/AdicionarRegistro`;

        return this.http.post<boolean>(url, registro);
    }

    public excluirRegistro(id: number): Observable<boolean> {
        const url = this.baseURL + '/ExcluirRegistro/' + id;

        return this.http.delete<boolean>(url);
    }
}

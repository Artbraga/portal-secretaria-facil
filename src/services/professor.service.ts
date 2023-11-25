import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Professor } from 'src/app/model/professor.model';


@Injectable({ providedIn: 'root', })
export class ProfessorService extends BaseService<Professor> {

    constructor(http: HttpClient) {
        super(http, 'Professor');
    }

    public listarProfessoresDaTurma(turmaId: number) {
        const url = this.baseURL + `/ListarProfessoresDaTurma/${turmaId}`;

        return this.http.get<Professor[]>(url);
    }
}

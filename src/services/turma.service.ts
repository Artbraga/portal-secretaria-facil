import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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
}
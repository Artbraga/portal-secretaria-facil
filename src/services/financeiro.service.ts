import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PageTableResult } from "src/app/components/page-table-result";
import { Boleto } from "src/app/model/boleto.model";
import { Professor } from "src/app/model/professor.model";

@Injectable({ providedIn: "root" })
export class FinanceiroService extends BaseService<Professor> {
    constructor(http: HttpClient) {
        super(http, "Financeiro");
    }

    listarBoletos(): Observable<Boleto[]> {
        const url = this.baseURL + `/ListarBoletosDoUsuario`;

        return this.http.get<Boleto[]>(url);
    }
}

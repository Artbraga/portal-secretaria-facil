import { Component, OnInit } from '@angular/core';
import { BaseTable, Coluna } from 'src/app/components/base-table';
import { Boleto } from 'src/app/model/boleto.model';
import { FinanceiroService } from 'src/services/financeiro.service';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.scss']
})
export class FinanceiroComponent extends BaseTable<Boleto> implements OnInit {

  constructor(private financeiroService: FinanceiroService) {
    super();
    this.columns.push({
        key: "seuNumero",
        header: "Número",
        field: "seuNumero",
    } as Coluna);
    this.columns.push({
        key: "vencimento",
        header: "Vencimento",
        field: "dataVencimentoStr",
    } as Coluna);
    this.columns.push({
        key: "valor",
        header: "Valor",
        field: "valorStr",
    } as Coluna);
    this.columns.push({
        key: "pagamento",
        header: "Data do Pagamento",
        field: "dataPagamentoStr",
    } as Coluna);
    this.columns.push({
        key: "valorPago",
        header: "Valor Pago",
        field: "valorPagoStr",
    } as Coluna);
    this.columns.push({
        key: "status",
        header: "Situação",
        field: "status",
    } as Coluna);
  }

  ngOnInit(): void {
    this.financeiroService.listarBoletos().subscribe(data => {
      this.list = data.map(x => {
        var boleto = Object.assign(new Boleto(), x)
        boleto.corrigirInformacoes();
        return boleto;
      });
    })
  }
}

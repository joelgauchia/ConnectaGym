import { Component, OnInit } from '@angular/core';
import { Quota } from '../../models/quota.model';
import { QuotesService } from '../../services/quotes.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExcelService } from '../../services/excel.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class QuotesComponent implements OnInit {

  quotes!: Quota[];
  quota!: Quota;
  crearQuotaDialog: boolean = false;
  editarQuotaDialog: boolean = false;

  constructor(
    private quotesService: QuotesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tokenService: TokenService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.carregarQuotes();
  }

  carregarQuotes(): void {
    if (this.tokenService.isSuperAdmin()) {
      this.quotesService.getQuotes().subscribe(response => {
        this.quotes = response;
      });
    }
    else {
      this.quotesService.getQuotesCreadorActiu().subscribe(response => {
        this.quotes = response;
      });
    }
  }

  crearQuota() {
    this.crearQuotaDialog = true;
  }

  quotaCreada(event: any) {
    this.quotesService.crearQuota(event).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Fet', detail: response, life: 3000});
      console.log(response);
      this.carregarQuotes();
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error, life: 5000 });
    });
    this.crearQuotaDialog = false;
  }

  editarQuota(quota: Quota) {
    this.quota = quota;
    this.editarQuotaDialog = true;
  }

  quotaEditada(event: any) {
    this.quotesService.actualitzarQuota(event.id, event).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Fet!', detail: "Quota editada correctament", life: 3000 });
      this.carregarQuotes();
      console.log(response);
    });
    this.editarQuotaDialog = false;
  }

  eliminarQuota(quota: Quota) {
    this.confirmationService.confirm({
      message: "Segur que vols eliminar la quota " + quota.nom + '?',
      header: 'Confirma',
      icon: 'pi pi-exclamation-triangle',
      accept:() => {
        this.quotesService.eliminarQuota(quota).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Fet!', detail: response, life: 3000 });
          this.carregarQuotes();
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error, life: 5000 });
        });
      }
    });
  }

  exportToExcel(): void {
    const headers = ['Nom', 'Preu', 'Tipus', 'Mesos', 'Gimnàs', 'Creat per', 'Creat', 'Modificat'];
    const data = this.quotes.map(quota => [
      quota.nom,
      quota.preu,
      quota.tipus,
      quota.mesos,
      quota.gimnas.nom,
      quota.creador.nom,
      quota.dataCreacio,
      quota.dataModificacio
    ]);
    const fileName = 'quotes';
    const sheetName = 'Quotes';
    this.excelService.exportToExcel(headers, data, fileName, sheetName);
  }
}

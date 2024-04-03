import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PagamentsService } from '../../services/pagaments.service';
import { Pagament } from '../../models/pagament.model';
import { Membre } from '../../models/membre.model';
import { MembresService } from '../../services/membres.service';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-pagaments',
  templateUrl: './pagaments.component.html',
  styleUrl: './pagaments.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class PagamentsComponent implements OnInit {

  pagaments!: Pagament[];
  pagament!: Pagament;

  editarPagamentDialog: boolean = false;

  constructor(
    private pagamentsService: PagamentsService,
    private membresService: MembresService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.carregarPagaments();
  }

  carregarPagaments() {
    this.pagamentsService.getPagaments().subscribe(response => {
      this.pagaments = response;
      console.log(this.pagaments);
    });
  }


  eliminarPagament(pagament: Pagament) {
    this.pagament = pagament;
    this.confirmationService.confirm({
      message: "Segur que vols eliminar el pagament d'en " + this.pagament.membre.nom + '?',
      header: 'Confirma',
      icon: 'pi pi-exclamation-triangle',
      accept:() => {
        this.pagamentsService.eliminarPagament(pagament).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Fet!', detail: response, life: 3000 });
          this.carregarPagaments();
        }, 
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error, life: 5000 });
        });
      }
    });
  }

  exportToExcel(): void {
    const headers = ['Membre', 'Quota', 'Quantitat', 'Data Inici', 'Data Final', 'Gimnàs'];
    const data = this.pagaments.map(pagament => [
        pagament.membre.nom,
        pagament.quota.nom,
        pagament.quantitat,
        new Date(pagament.dataInici).toLocaleString(),
        new Date(pagament.dataFinal).toLocaleString(),
        pagament.gimnas.nom
    ]);
    const fileName = 'pagaments';
    const sheetName = 'Pagaments';
    this.excelService.exportToExcel(headers, data, fileName, sheetName);
  }
}

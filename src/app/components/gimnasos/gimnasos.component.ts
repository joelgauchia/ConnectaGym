import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExcelService } from '../../services/excel.service';
import { GimnasosService } from '../../services/gimnasos.service';
import { Gimnas } from '../../models/gimnas.model';

@Component({
  selector: 'app-gimnasos',
  templateUrl: './gimnasos.component.html',
  styleUrl: './gimnasos.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class GimnasosComponent implements OnInit {

  gimnasos!: Gimnas[];
  gimnas!: Gimnas;
  submitted: boolean = false;

  crearGimnasDialog: boolean = false;
  editarGimnasDialog: boolean = false;

  constructor(
    private gimnasosService: GimnasosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private excelService: ExcelService
  ) { }

  ngOnInit() {
    this.carregarGimnasos();
  }

  carregarGimnasos(): void {
    this.gimnasosService.getGimnasos().subscribe(response => {
      this.gimnasos = response;
      console.log(this.gimnasos);
    });
  }

  crearGimnas() {
    this.crearGimnasDialog = true; 
  }

  gimnasCreat(event: any) {
    this.gimnasosService.crearGimnas(event).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Fet', detail: response, life: 3000 });
      this.carregarGimnasos();
    }, 
    error => {
      console.log(error.error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error, life: 5000 });
    });
    this.crearGimnasDialog = false;
  }

  editarGimnas(gimnas: Gimnas) {
    this.gimnas = gimnas;
    this.editarGimnasDialog = true; 
  }

  gimnasEditat(event: any) {
    this.gimnasosService.actualitzarGimnas(event.id, event).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Fet!', detail: "Gimnàs editat correctament", life: 3000 });
      this.carregarGimnasos();
      console.log(response);
    });
    this.editarGimnasDialog = false;
  }
  
  eliminarGimnas(gimnas: Gimnas) {
    this.confirmationService.confirm({
      message: "Segur que vols eliminar el gimnàs " + gimnas.nom + '?', 
      header: 'Confirma',
      icon: 'pi pi-exclamation-triangle',
      accept:() => {
       this.gimnasosService.eliminarGimnas(gimnas).subscribe(response => {
        this.messageService.add({ severity: 'success', summary: 'Fet!', detail: response, life: 3000 });
        this.carregarGimnasos();
       },
       error => {
         this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error, life: 5000 });
       });
      }
    });
  }

  exportToExcel(): void {
    const headers = ['Nom', 'Adreça', 'Email', 'Telèfon', 'Propietari', 'Creat per', 'Creat', 'Modificat'];
    const data = this.gimnasos.map(gimnas => [
      gimnas.nom,
      gimnas.adreca,
      gimnas.email,
      gimnas.telefon,
      gimnas.propietari.nom,
      gimnas.creador.nom,
      gimnas.dataCreacio,
      gimnas.dataModificacio
    ]);
    const fileName = 'gimnasos';
    const sheetName = 'Gimnasos';
    this.excelService.exportToExcel(headers, data, fileName, sheetName);
  }
}

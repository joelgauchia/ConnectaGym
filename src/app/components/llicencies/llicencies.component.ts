import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExcelService } from '../../services/excel.service';
import { Llicencia } from '../../models/llicencia.model';
import { LlicenciesService } from '../../services/llicencies.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-llicencies',
  templateUrl: './llicencies.component.html',
  styleUrl: './llicencies.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class LlicenciesComponent implements OnInit {

  llicencies!: Llicencia[];
  llicencia!: Llicencia[];
  submitted: boolean = false;

  crearLlicenciaDialog: boolean = false;

  constructor(
    private llicenciesService: LlicenciesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private excelService: ExcelService
  ) { }

  ngOnInit() {
    this.carregarLlicencies();
  }

  carregarLlicencies(): void {
    this.llicenciesService.getLlicencies().subscribe(response => {
      this.llicencies = response;
      console.log(this.llicencies);

      this.llicencies.forEach(llicencia => {
        const dataActual = new Date().getTime();
        console.log(llicencia.dataVenciment);
        console.log(dataActual);
        const dataVenciment = new Date(llicencia.dataVenciment).getTime();
        if (llicencia.activa && dataVenciment < dataActual) {
          llicencia.activa = false;
          this.llicenciesService.setInactiva(llicencia).subscribe(() => {});
        }
      });
    });
  }

  crearLlicencia() {
    this.crearLlicenciaDialog = true; 
  }

  llicenciaCreada(event: any) {
    this.llicenciesService.crearLlicencia(event).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Fet', detail: response, life: 3000 });
      this.carregarLlicencies();
      console.log(response);
      this.crearLlicenciaDialog = false;
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ja existeix una llicència per a aquest propietari', life: 3000 });
    });
  }
 
  tipusLlicencies() {
  
  }

  veureLlicencia(event: any) {
  
  }
  
  eliminarLlicencia(event: any) {
    this.confirmationService.confirm({
      message: "Segur que vols eliminar la llicència d'en " + event.propietari.nom + '?', 
      header: 'Confirma',
      icon: 'pi pi-exclamation-triangle',
      accept:() => {
        this.llicenciesService.eliminarLlicencia(event).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Fet!', detail: response, life: 3000 });
          this.carregarLlicencies();
        })
      }
    })
  }

  exportToExcel() {
  
  }
}
 
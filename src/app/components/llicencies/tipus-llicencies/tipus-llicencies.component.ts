import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipusLlicencia } from '../../../models/tipus-llicencia.model';
import { TipusLlicenciaService } from '../../../services/tipusLlicencia.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExcelService } from '../../../services/excel.service';

@Component({
  selector: 'app-tipus-llicencies',
  templateUrl: './tipus-llicencies.component.html',
  styleUrl: './tipus-llicencies.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class TipusLlicenciesComponent implements OnInit {

  @Input() veureTipus!: boolean;
  @Output() veureLlicencies = new EventEmitter<boolean>();

  tipusLlicencia!: TipusLlicencia[];
  tipusLlicencia1!: TipusLlicencia;

  crearTipusLlicenciaDialog: boolean = false;
  editarTipusLlicenciaDialog: boolean = false;

  constructor(
    private tipusLlicenciaService: TipusLlicenciaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private excelService: ExcelService
  ) { }

  ngOnInit() {
    this.carregarTipusLlicencia();
  }

  carregarTipusLlicencia(): void {
    this.tipusLlicenciaService.getTipusLlicencia().subscribe(response => {
      this.tipusLlicencia = response;
      console.log(this.tipusLlicencia);
    });
  }

  crearTipusLlicencia() {
    this.crearTipusLlicenciaDialog = true;
  }

  tipusLlicenciaCreat(event: any) {
    this.tipusLlicenciaService.crearTipusLlicencia(event).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Fet', detail: response, life: 3000 });
      this.carregarTipusLlicencia();
      console.log(response);
      this.crearTipusLlicenciaDialog = false;
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ja existeix un tipus de llicència amb aquest nom', life: 3000 });
    });
  }

  editarTipusLlicencia(tipusLlicencia: TipusLlicencia) {
    this.tipusLlicencia1 = tipusLlicencia;
    console.log(this.tipusLlicencia1);
    this.editarTipusLlicenciaDialog = true;
  }

  tipusLlicenciaEditat(event: any) {
    this.tipusLlicenciaService.actualitzarTipusLlicencia(event.id, event).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Fet!', detail: "Tipus de llicència editat correctament", life: 3000 });
      this.carregarTipusLlicencia();
      console.log(response);
    });
    this.editarTipusLlicenciaDialog = false;
  }

  eliminarTipusLlicencia(event: any) {
    this.confirmationService.confirm({
      message: "Segur que vols eliminar el tipus de llicència: " + event.nom + '?', 
      header: 'Confirma',
      icon: 'pi pi-exclamation-triangle',
      accept:() => {
        this.tipusLlicenciaService.eliminarTipusLlicencia(event).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Fet!', detail: response, life: 3000 });
          this.carregarTipusLlicencia();
        })
      }
    })
  }

  llicencies() {
    this.veureLlicencies.emit(true);
  }
  
  exportToExcel(): void {
    const headers = ['Nom', 'Preu', 'Tipus', 'Mesos', 'Creat per', 'Creat', 'Modificat'];
    const data = this.tipusLlicencia.map(tipus => [
      tipus.nom,
      tipus.preu,
      tipus.tipus,
      tipus.mesos,
      tipus.creador.nom,
      new Date(tipus.dataCreacio).toLocaleString(),
      new Date(tipus.dataModificacio).toLocaleString()
    ]);
    const fileName = 'tipus_licencia';
    const sheetName = 'Tipus_Llicencia';
    this.excelService.exportToExcel(headers, data, fileName, sheetName);
  }
}

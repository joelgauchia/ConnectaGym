import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExcelService } from '../../services/excel.service';
import { TokenService } from '../../services/token.service';
import { Propietari } from '../../models/propietari.model';
import { PropietarisService } from '../../services/propietaris.service';

@Component({
  selector: 'app-propietaris',
  templateUrl: './propietaris.component.html',
  styleUrl: './propietaris.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class PropietarisComponent implements OnInit {

  propietaris!: Propietari[];
  propietari!: Propietari;
  submitted: boolean = false;

  crearPropietariDialog: boolean = false;
  editarPropietariDialog: boolean = false;

  constructor(
    private propietarisService: PropietarisService,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService, 
    private excelService: ExcelService,
  ) { }

  ngOnInit() {
    this.carregarPropietaris();
  }

  carregarPropietaris(): void {
    this.propietarisService.getPropietaris().subscribe(response => {
      this.propietaris = response;
      console.log(this.propietaris);
    });
  }

  crearPropietari() {
    this.crearPropietariDialog = true;
  }

  propietariCreat(event: any) {
    this.propietarisService.crearPropietari(event).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Fet', detail: response, life: 3000});
      this.carregarPropietaris();
      console.log(response);
      this.crearPropietariDialog = false;
    }, 
    error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
    });
  }

  editarPropietari(propietari: Propietari) {
    this.propietari = propietari;
    console.log(this.propietari);
    this.editarPropietariDialog = true;
  }

  propietariEditat(event: any) {
    this.propietarisService.actualitzarPropietari(event.id, event).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Fet!', detail: "Propietari editat correctament", life: 3000 });
      this.carregarPropietaris();
      console.log(response);
    });
    this.editarPropietariDialog = false;
  }

  eliminarPropietari(propietari: Propietari) {
    this.confirmationService.confirm({
      message: "Segur que vols eliminar el propietari " + propietari.nom + '?',
      header: 'Confirma',
      icon: 'pi pi-exclamation-triangle',
      accept:() => {
        this.propietarisService.eliminarPropietari(propietari).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Fet!', detail: response, life: 3000 });
          this.carregarPropietaris();
        })
      }
    })
  }

  exportToExcel(): void {
    const headers = ['Nom', 'Email', 'Telèfon', 'Adreça', 'Data Naixement', 'Gènere', 'Tipus', 'Creador', 'Creat', 'Modificat'];
    const data = this.propietaris.map(propietari => [
      propietari.nom,
      propietari.email,
      propietari.telefon,
      propietari.adreca,
      propietari.dataNaixement,
      propietari.genere,
      propietari.tipus,
      propietari.creador.nom,
      propietari.dataCreacio,
      propietari.dataModificacio
    ]);
    const fileName = 'propietaris';
    const sheetName = 'Propietaris';
    this.excelService.exportToExcel(headers, data, fileName, sheetName);
  }
}

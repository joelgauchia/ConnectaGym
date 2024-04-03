import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExcelService } from '../../services/excel.service';
import { Membre } from '../../models/membre.model';
import { MembresService } from '../../services/membres.service';
import { Quota } from '../../models/quota.model';
import { PagamentsService } from '../../services/pagaments.service';
import { Pagament } from '../../models/pagament.model';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrl: './membres.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class MembresComponent implements OnInit {

  membres!: Membre[];
  membre!: Membre;
  submitted: boolean = false;

  crearMembreDialog: boolean = false;
  editarMembreDialog: boolean = false;
  cobrarMembreDialog: boolean = false;

  constructor(
  private membresService: MembresService,
  private pagamentsService: PagamentsService,
  private messageService: MessageService,
  private confirmationService: ConfirmationService,
  private excelService: ExcelService
  ) { }

  ngOnInit() {
    this.carregarMembres();
  }

  carregarMembres(): void {
    this.membresService.getMembres().subscribe(response => {
      this.membres = response;
      console.log(this.membres);
  
      this.membres.forEach(membre => {
        this.pagamentsService.getPagamentActiu(membre).subscribe(pagament => {
          if (pagament === null) {
            this.pagamentsService.getPagamentsInactiusMembre(membre).subscribe(pagaments => {
              console.log('inactius: ', pagaments);
              if(pagaments === null || pagaments.length === 0) {
                membre.estat = 'SENSE';
              }
              else membre.estat = 'INACTIU';
            });
            this.membresService.actualitzarMembre(membre.id, membre).subscribe(response => {
              console.log(response);
            });
          } 
        }); 
      });
    });
  }

  crearMembre() {
    this.crearMembreDialog = true;
  }

  membreCreat(event: any) {
    this.membresService.crearMembre(event).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Fet', detail: response, life: 3000 });
      this.carregarMembres();
      console.log(response);
    }, 
    error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error, life: 5000 });
    });
    this.crearMembreDialog = false;
  }

  editarMembre(membre: Membre) {
    this.membre = membre;
    console.log(this.membre);
    this.editarMembreDialog = true;

  }

  membreEditat(event: any) {
    this.membresService.actualitzarMembre(event.id,event).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Fet!', detail: "Membre editat correctament", life: 3000 });
      this.carregarMembres();
      console.log(response);
    });
    this.editarMembreDialog = false;
  }

  eliminarMembre(membre: Membre) {
    this.confirmationService.confirm({
      message: "Segur que vols eliminar el membre " + membre.nom + '?', 
      header: 'Confirma',
      icon: 'pi pi-exclamation-triangle',
      accept:() => {
       this.membresService.eliminarMembre(membre).subscribe(response => {
        this.messageService.add({ severity: 'success', summary: 'Fet!', detail: response, life: 3000 });
        this.carregarMembres();
       },
       error => {
         this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error, life: 5000 });
       });
      }
    });
  }

  veureMembre(membre: Membre) {

  }

  cobrarMembre(membre: Membre) {
    this.membre = membre;
    this.cobrarMembreDialog = true;
  }

  realitzarPagament(event: any) {
    const dataInici = new Date();
    const dataFi = new Date();
    dataFi.setMonth(dataFi.getMonth() + event.mesos);
    console.log(dataFi);
    const nouPagament: Pagament = {
      membre: this.membre,
      quota: event,
      quantitat: event.preu, 
      dataInici: dataInici,
      dataFinal: dataFi,
      gimnas: this.membre.gimnas 
    };
    console.log(nouPagament);
    this.pagamentsService.crearPagament(nouPagament).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Fet', detail: 'Pagament realitzat amb èxit', life: 3000 });
      if (this.membre.estat === 'SENSE' || this.membre.estat === 'INACTIU') this.membre.estat = 'ACTIU';
      this.membresService.actualitzarMembre(this.membre.id, this.membre).subscribe(() => {
        console.log('Estat del membre actualitzat correctament');
      });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error, life: 5000 });
    });
    this.cobrarMembreDialog = false;
  }

  exportToExcel(): void {
    const headers = ['Nom', 'Email', 'Telefon', 'Estat', 'Gènere', 'Data Naixement', 'Gimnàs', 'Creat per', 'Creat', 'Modificat', 'Observacions'];
    const data = this.membres.map(membre => [
        membre.nom,
        membre.email,
        membre.telefon,
        membre.estat,
        membre.genere,
        new Date(membre.dataNaixement).toLocaleString(),
        membre.gimnas.nom,
        membre.creador.nom,
        new Date(membre.dataCreacio).toLocaleString(),
        new Date(membre.dataModificacio).toLocaleString(),
        membre.observacions
    ]);
    const fileName = 'membres';
    const sheetName = 'Membres';
    this.excelService.exportToExcel(headers, data, fileName, sheetName);
  }
}
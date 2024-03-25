import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ExcelService } from '../../services/excel.service';
import { Membre } from '../../models/membre.model';
import { MembresService } from '../../services/membres.service';

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
  private messageService: MessageService,
  private confirmationsService: ConfirmationService,
  private excelService: ExcelService
  ) { }

  ngOnInit() {
  this.carregarMembres();
  }

  carregarMembres(): void {
  this.membresService.getMembres().subscribe(response => {
    this.membres = response;
    console.log(this.membres);
  })
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

  }

  baixaMembre(membre: Membre) {

  }

  veureMembre(membre: Membre) {

  }

  cobrarMembre(membre: Membre) {
    this.cobrarMembreDialog = true;
  }

  exportToExcel(): void {

  }
}
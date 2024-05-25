import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ExcelService } from '../../services/excel.service';
import { Visita } from '../../models/visita.model';
import { VisitesService } from '../../services/visites.service';
import { UsuarisService } from '../../services/usuaris.service';
import { TokenService } from '../../services/token.service';
import { Gimnas } from '../../models/gimnas.model';
import { Usuari } from '../../models/usuari.model';

@Component({
  selector: 'app-visites',
  templateUrl: './visites.component.html',
  styleUrl: './visites.component.scss',
  providers: [MessageService]
})
export class VisitesComponent implements OnInit {

  @Input() usuari!: Usuari;

  visites!: Visita[];
  visita!: Visita;
  gimnas!: Gimnas;

  crearVisitaDialog: boolean = false;
  crearVisitaRegularDialog: boolean = false;

  constructor(
    private visitesService: VisitesService,
    private usuarisService: UsuarisService,
    private tokenService: TokenService,
    private messageService: MessageService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.carregarVisites();
  }

  carregarVisites(): void {
    this.visitesService.getVisitesByGimnasNom(this.usuari.gimnasStaff.nom).subscribe(visites => {
      this.visites = visites;
      this.gimnas = this.usuari.gimnasStaff;
      console.log(this.visites);
    });
  }

  crearVisita(): void {
    this.crearVisitaDialog = true;
    console.log(this.crearVisitaDialog);
  }

  crearVisitaRegular(): void {
    this.crearVisitaRegularDialog = true;
  }

  visitaCreada(visita: Visita) {
    console.log(visita);
    this.novaVisita(visita);
    this.crearVisitaDialog = false;
  }

  visitaRegularCreada(event: number) {
    const cost: number = event;
    console.log(cost);
    const visita: Visita = {
      gimnas: this.gimnas,
      preu: cost,
      dataVisita: new Date(),
      abonat: false
    }
    this.novaVisita(visita);
    this.crearVisitaRegularDialog = false;
  }

  private novaVisita(visita: Visita): void {
    this.visitesService.crearVisita(visita).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Fet', detail: response, life: 3000 });
      this.carregarVisites();
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error, life: 5000 });
    });
  }

  veureVisita(visita: Visita): void {

  } 

  exportToExcel(): void {

  }
}

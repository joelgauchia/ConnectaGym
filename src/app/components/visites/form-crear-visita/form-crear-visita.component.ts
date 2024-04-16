import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Membre } from '../../../models/membre.model';
import { UsuarisService } from '../../../services/usuaris.service';
import { TokenService } from '../../../services/token.service';
import { MembresService } from '../../../services/membres.service';
import { Visita } from '../../../models/visita.model';
import { PagamentsService } from '../../../services/pagaments.service';
import { Pagament } from '../../../models/pagament.model';
import { Gimnas } from '../../../models/gimnas.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form-crear-visita',
  templateUrl: './form-crear-visita.component.html',
  styleUrl: './form-crear-visita.component.scss',
  providers: [MessageService]
})
export class FormCrearVisitaComponent implements OnInit {

  @Output() successfullyCreated = new EventEmitter<Visita>();

  membres!: Membre[];
  membre!: Membre;
  gimnas!: Gimnas;
  pagament: Pagament | undefined;
  visitaForm!: FormGroup;
  visita!: Visita;

  pagarDialog: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuarisService: UsuarisService,
    private membresService: MembresService,
    private pagamentsService: PagamentsService,
    private tokenService: TokenService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getMembres();
    this.initForm();
  }

  getMembres(): void {
    this.usuarisService.getUsuariActiuByNomUsuari(this.tokenService.getUsername()).subscribe(usuari => {
      this.gimnas = usuari.gimnasStaff;
      this.membresService.getMembresGimnas(usuari.gimnasStaff).subscribe(membres => {
        this.membres = membres;
      });
    });
  }

  initForm(): void {
    this.visitaForm = this.fb.group({
      membre: ['', Validators.required]
    });
  }

  actualitzarMembre(event: any): void {
    this.membre = event.value;
    if (this.membre.estat === "ACTIU") {
      this.pagamentsService.getPagamentActiu(this.membre).subscribe(pagament => {
        this.pagament = pagament;
        console.log(this.pagament);
      });
    } else this.pagament = undefined;
  }

  crearVisitaMembre(): void {
    this.visita = {
      dataVisita: new Date(),
      gimnas: this.gimnas,
      abonat: true,
      membreGimnas: this.visitaForm.get('membre')?.value
    }
    if (this.membre.estat === 'INACTIU' || this.membre.estat === 'SENSE') {
      this.pagarDialog = true;
    }
    else {
      this.visitaForm.reset();
      this.successfullyCreated.emit(this.visita);
    }
  }

  pagamentRealitzat(event: any): void {
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
    this.pagarDialog = false;
  }
}

import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { TipusLlicencia } from '../../../../models/tipus-llicencia.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuari } from '../../../../models/usuari.model';
import { UsuarisService } from '../../../../services/usuaris.service';
import { TokenService } from '../../../../services/token.service';

@Component({
  selector: 'app-form-tipus-llicencia',
  templateUrl: './form-tipus-llicencia.component.html',
  styleUrl: './form-tipus-llicencia.component.scss'
})
export class FormTipusLlicenciaComponent implements OnInit {

  @Input() mode!: string;
  @Input() tipusLlicencia!: TipusLlicencia;

  @Output() successfullyCreated = new EventEmitter<TipusLlicencia>();
  @Output() successfullyEdited = new EventEmitter<TipusLlicencia>();

  tipusLlicenciaForm!: FormGroup;
  usuari!: Usuari;

  durada: string[] = ["MENSUAL","TRIMESTRAL","ANUAL"];
  tipus: string[] = ["INDIVIDUAL","CADENA"];

  constructor (
    private fb: FormBuilder,
    private usuarisService: UsuarisService,
    private tokenService: TokenService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tipusLlicencia'] && changes['tipusLlicencia'].currentValue) {
      this.initForm();
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.mode === 'editar') {
      this.tipusLlicenciaForm = this.fb.group({
        nom: ['', Validators.required],
        preu: ['', Validators.required]
      });
    }
    else {
      this.tipusLlicenciaForm = this.fb.group({
        nom: ['', Validators.required],
        preu: ['', Validators.required],
        durada: ['', Validators.required],
        tipus: ['', Validators.required]
      });
    }
    if (this.mode === 'editar' && this.tipusLlicencia) {
      this.tipusLlicenciaForm.patchValue({
        nom: this.tipusLlicencia.nom,
        preu: this.tipusLlicencia.preu
      });
    }
  }

  tractarTipusLlicencia(): void {
    const tipusLlicenciaGuardat: TipusLlicencia = this.tipusLlicenciaForm.value;
    this.usuarisService.getUsuariByNomUsuari(this.tokenService.getUsername()).subscribe(response => {
      this.usuari = response;
      
      if (this.mode === 'editar') {
        if (this.tipusLlicencia.durada === "ANUAL") tipusLlicenciaGuardat.mesos = 12;
        else if (this.tipusLlicencia.durada === "TRIMESTRAL") tipusLlicenciaGuardat.mesos = 3;
        else tipusLlicenciaGuardat.mesos = 1;
      }
      else {
        if (tipusLlicenciaGuardat.durada === "ANUAL") tipusLlicenciaGuardat.mesos = 12;
        else if (tipusLlicenciaGuardat.durada === "TRIMESTRAL") tipusLlicenciaGuardat.mesos = 3;
        else tipusLlicenciaGuardat.mesos = 1;
      }
      if (this.mode === 'editar') {
        tipusLlicenciaGuardat.tipus = this.tipusLlicencia.tipus;
        tipusLlicenciaGuardat.durada = this.tipusLlicencia.durada;
        tipusLlicenciaGuardat.id = this.tipusLlicencia.id;
        tipusLlicenciaGuardat.dataCreacio = this.tipusLlicencia.dataCreacio;
      } 
      tipusLlicenciaGuardat.creador = this.usuari;

      this.tipusLlicenciaForm.reset();
      console.log(tipusLlicenciaGuardat);
      if (this.mode === 'editar') this.successfullyEdited.emit(tipusLlicenciaGuardat);
      else this.successfullyCreated.emit(tipusLlicenciaGuardat);
    });
  }
}

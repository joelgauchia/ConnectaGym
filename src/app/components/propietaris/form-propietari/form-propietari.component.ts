import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Propietari } from '../../../models/propietari.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../../services/token.service';
import { UsuarisService } from '../../../services/usuaris.service';
import { Usuari } from '../../../models/usuari.model';

@Component({
  selector: 'app-form-propietari',
  templateUrl: './form-propietari.component.html',
  styleUrl: './form-propietari.component.scss'
})
export class FormPropietariComponent implements OnInit {

  @Input() mode!: string;
  @Input() propietari!: Propietari;

  @Output() successfullyEdited = new EventEmitter<Propietari>();
  @Output() successfullyCreated = new EventEmitter<Propietari>();

  propietariForm!: FormGroup;
  usuariCreador!: Usuari;
  tipus!: any[];

  constructor(
    private fb: FormBuilder,
    private usuarisService: UsuarisService,
    private tokenService: TokenService
    ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['propietari'] && changes['propietari'].currentValue) {
      this.initForm();
    }
  }

  ngOnInit(): void {
    this.tipus = ["INDIVIDUAL", "CADENA"];
    this.initForm();
  }

  initForm() {
    if (this.mode === 'editar') {
      this.propietariForm = this.fb.group({
        nom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefon: ['', Validators.required],
        adreca: ['', Validators.required],
        dataNaixement: ['', Validators.required]
      });
    }
    else {
      this.propietariForm = this.fb.group({
        nom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefon: ['', Validators.required],
        adreca: ['', Validators.required],
        dataNaixement: ['', Validators.required],
        genere: ['', Validators.required],
        tipus: ['', Validators.required]
      });
    }
    if (this.mode === 'editar' && this.propietari) {
      const dataNaixement = new Date(this.propietari.dataNaixement);
      this.propietariForm.patchValue({
        nom: this.propietari.nom,
        email: this.propietari.email,
        telefon: this.propietari.telefon,
        adreca: this.propietari.adreca,
        dataNaixement: dataNaixement
      });
    }
  }

  guardarPropietari(): void {
    const propietariGuardat: Propietari = this.propietariForm.value;
    propietariGuardat.id = this.propietari.id;
    propietariGuardat.genere = this.propietari.genere;
    propietariGuardat.tipus = this.propietari.tipus;
    propietariGuardat.creador = this.propietari.creador;
    propietariGuardat.dataCreacio = this.propietari.dataCreacio;
    console.log(propietariGuardat);
    this.propietariForm.reset();
    this.successfullyEdited.emit(propietariGuardat);
  }

  crearPropietari(): void {
    const propietariGuardat: Propietari = this.propietariForm.value;
    this.usuarisService.getUsuariByNomUsuari(this.tokenService.getUsername()).subscribe(response => {
      this.usuariCreador = response;
      propietariGuardat.creador = this.usuariCreador;
      console.log(propietariGuardat);
      this.propietariForm.reset();
      this.successfullyCreated.emit(propietariGuardat);
    });
  }
}

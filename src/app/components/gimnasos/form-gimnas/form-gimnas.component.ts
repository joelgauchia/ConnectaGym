import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Gimnas } from '../../../models/gimnas.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuari } from '../../../models/usuari.model';
import { TokenService } from '../../../services/token.service';
import { UsuarisService } from '../../../services/usuaris.service';
import { PropietarisService } from '../../../services/propietaris.service';
import { Propietari } from '../../../models/propietari.model';

@Component({
  selector: 'app-form-gimnas',
  templateUrl: './form-gimnas.component.html',
  styleUrl: './form-gimnas.component.scss'
})
export class FormGimnasComponent implements OnInit {

  @Input() mode!: string;
  @Input() gimnas!: Gimnas;

  @Output() successfullyEdited = new EventEmitter<Gimnas>();
  @Output() successfullyCreated = new EventEmitter<Gimnas>();

  gimnasForm!: FormGroup;
  usuariCreador!: Usuari;
  propietaris!: Propietari[];
  
  constructor(
    private fb: FormBuilder,
    private usuarisService: UsuarisService,
    private propietarisService: PropietarisService,
    private tokenService: TokenService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gimnas'] && changes['gimnas'].currentValue) {
      this.initForm();
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.propietarisService.getPropietaris().subscribe(response => {
      this.propietaris = response;
      console.log(this.propietaris);
    });
  }

  initForm() {
    if (this.mode === 'editar') {
      this.gimnasForm = this.fb.group({
        nom: ['', Validators.required],
        adreca: ['', Validators.required],
        telefon: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      });
    }
    else {
      this.gimnasForm = this.fb.group({
        nom: ['', Validators.required],
        adreca: ['', Validators.required],
        telefon: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]], 
        propietari: ['', Validators.required]
      });
    }
    if (this.mode === 'editar' && this.gimnas) {
      this.gimnasForm.patchValue({
        nom: this.gimnas.nom,
        adreca: this.gimnas.adreca,
        telefon: this.gimnas.telefon,
        email: this.gimnas.email
      });
    }
  }

  crearGimnas(): void {
    const gimnasGuardat: Gimnas = this.gimnasForm.value;
    this.usuarisService.getUsuariByNomUsuari(this.tokenService.getUsername()).subscribe(response => {
      this.usuariCreador = response;
      gimnasGuardat.creador = this.usuariCreador;
      console.log(gimnasGuardat);
      this.gimnasForm.reset();
      this.successfullyCreated.emit(gimnasGuardat);
    });
  }

  guardarGimnas(): void {
    const gimnasGuardat: Gimnas = this.gimnasForm.value;
    gimnasGuardat.id = this.gimnas.id;
    gimnasGuardat.creador = this.gimnas.creador;
    gimnasGuardat.propietari = this.gimnas.propietari;
    gimnasGuardat.dataCreacio = this.gimnas.dataCreacio;
    console.log(gimnasGuardat);
    this.gimnasForm.reset();
    this.successfullyEdited.emit(gimnasGuardat);
  }
}

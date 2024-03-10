import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Usuari } from '../../../models/usuari.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol, RolNom } from '../../../models/rol.model';

@Component({
  selector: 'app-form-usuari',
  templateUrl: './form-usuari.component.html',
  styleUrl: './form-usuari.component.scss'
})
export class FormUsuariComponent {

  @Input() mode!: string;
  @Input() usuari!: Usuari;
  @Input() rols!: any[];

  @Output() successfullyEdited = new EventEmitter<Usuari>();
  @Output() successfullyCreated = new EventEmitter<Usuari>();

  usuariForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuari'] && changes['usuari'].currentValue) {
      this.initForm();
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.mode === 'editar') {
      this.usuariForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        nom: ['', Validators.required],
        actiu: ['', Validators.required],
      });
    }
    else {
      this.usuariForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        nom: ['', Validators.required],
        password: ['', Validators.required],
        actiu: ['', Validators.required],
        rols: ['', Validators.required],
        nomUsuari: ['', Validators.required]
      });
    }
    if (this.mode === 'editar' && this.usuari) {
      this.usuariForm.patchValue({
        email: this.usuari.email,
        nom: this.usuari.nom,
        actiu: this.usuari.actiu
      });
    }
  }

  guardarUsuari(): void {
    const usuariGuardat: Usuari = this.usuariForm.value;
    usuariGuardat.nomUsuari = this.usuari.nomUsuari;
    usuariGuardat.rols = this.usuari.rols;
    usuariGuardat.dataCreacio = this.usuari.dataCreacio;
    console.log(usuariGuardat);
    this.usuariForm.reset();
    this.successfullyEdited.emit(usuariGuardat);
  }

  crearUsuari(): void {
    const rols: Rol[] = [];

    const selectedRoles: string[] = this.usuariForm.value.rols;
        
    if (selectedRoles.includes('SUPERADMIN')) {
      rols.push(new Rol(RolNom.SUPERADMIN));
      rols.push(new Rol(RolNom.GYMADMIN));
      rols.push(new Rol(RolNom.STAFF));
    }
    else if (selectedRoles.includes('GYMADMIN') && !selectedRoles.includes('SUPERADMIN')) {
      rols.push(new Rol(RolNom.GYMADMIN));
      rols.push(new Rol(RolNom.STAFF));
    }
    else rols.push(new Rol(RolNom.STAFF));

    const usuariGuardat: Usuari = this.usuariForm.value;
    usuariGuardat.rols = rols;
    console.log(usuariGuardat);
    this.usuariForm.reset();
    this.successfullyCreated.emit(usuariGuardat);
  }
}


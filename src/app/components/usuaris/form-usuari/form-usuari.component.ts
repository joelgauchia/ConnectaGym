import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Usuari } from '../../../models/usuari.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol, RolNom } from '../../../models/rol.model';
import { Propietari } from '../../../models/propietari.model';
import { GimnasosService } from '../../../services/gimnasos.service';
import { Gimnas } from '../../../models/gimnas.model';

@Component({
  selector: 'app-form-usuari',
  templateUrl: './form-usuari.component.html',
  styleUrl: './form-usuari.component.scss'
})
export class FormUsuariComponent implements OnInit {

  @Input() mode!: string;
  @Input() esGymAdmin!: boolean;
  @Input() usuari!: Usuari;
  @Input() rols!: any[];

  @Output() successfullyEdited = new EventEmitter<Usuari>();
  @Output() successfullyCreated = new EventEmitter<{ usuari: Usuari, propietari?: Propietari }>();

  usuariForm!: FormGroup;
  tipusPropietari: any[] = [];
  gimnasos!: Gimnas[];

  constructor(
    private fb: FormBuilder,
    private gimnasosService: GimnasosService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuari'] && changes['usuari'].currentValue) {
      this.initForm();
    }
  }

  ngOnInit(): void {
    this.tipusPropietari = ["INDIVIDUAL", "CADENA"];
    this.gimnasos = [];
    if (this.esGymAdmin) {
      this.gimnasosService.getGimnasos().subscribe(response => {
        this.gimnasos = response.filter(gimnas => gimnas.propietari.nom === this.usuari?.nom);
        console.log(this.gimnasos);
      });
    } 
    else {
      this.gimnasosService.getGimnasosCreadorActiu().subscribe(response => {
        this.gimnasos = response;
      });
    }
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
        actiu: [''],
        rols: ['', Validators.required],
        nomUsuari: ['', Validators.required],
        telefon: [''], 
        adreca: [''], 
        dataNaixement: [''], 
        genere: [''], 
        tipus: [''],
        gimnas: ['']
      });
      if (this.esGymAdmin) {
        this.usuariForm.get('rols')?.setValidators([]);
        this.usuariForm.get('gimnas')?.setValidators([Validators.required]);
      }
      if (this.esRolGYMADMIN()) {
        this.usuariForm.get('telefon')?.setValidators([Validators.required]);
        this.usuariForm.get('adreca')?.setValidators([Validators.required]);
        this.usuariForm.get('dataNaixement')?.setValidators([Validators.required]);
        this.usuariForm.get('genere')?.setValidators([Validators.required]);
        this.usuariForm.get('tipus')?.setValidators([Validators.required]);
      }
      if (this.esRolSTAFF()) {
        this.usuariForm.get('gimnas')?.setValidators([Validators.required]);
      }
      this.usuariForm.updateValueAndValidity();
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
    usuariGuardat.actiu = true;

    let propietariGuardat: Propietari | undefined = undefined;
    if (this.esRolGYMADMIN()) {
      propietariGuardat = {
        nom: usuariGuardat.nom,
        email: usuariGuardat.email,
        telefon: this.usuariForm.get('telefon')?.value,
        adreca: this.usuariForm.get('adreca')?.value,
        dataNaixement: this.usuariForm.get('dataNaixement')?.value,
        genere: this.usuariForm.get('genere')?.value,
        tipus: this.usuariForm.get('tipus')?.value,
        creador: usuariGuardat,
        dataCreacio: new Date(),
        dataModificacio: new Date(),
        gimnasos: []
      }
    }

    if (this.esRolSTAFF() || this.esGymAdmin) {
      usuariGuardat.gimnasStaff = this.usuariForm.get('gimnas')?.value;
    }

    console.log(usuariGuardat);

    this.usuariForm.reset();
    this.successfullyCreated.emit({ usuari: usuariGuardat, propietari: propietariGuardat });
  }

  esRolGYMADMIN(): boolean {
    const rolSeleccionat = this.usuariForm.get('rols')?.value;
    return rolSeleccionat === 'GYMADMIN';
  }

  esRolSTAFF(): boolean {
    const rolSeleccionat = this.usuariForm.get('rols')?.value;
    return rolSeleccionat === 'STAFF';
  }
}
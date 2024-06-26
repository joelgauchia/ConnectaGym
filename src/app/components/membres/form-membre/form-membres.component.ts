import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Membre } from '../../../models/membre.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuari } from '../../../models/usuari.model';
import { UsuarisService } from '../../../services/usuaris.service';
import { TokenService } from '../../../services/token.service';
import { GimnasosService } from '../../../services/gimnasos.service';
import { Gimnas } from '../../../models/gimnas.model';
import { Rol, RolNom } from '../../../models/rol.model';

@Component({
  selector: 'app-form-membres',
  templateUrl: './form-membres.component.html',
  styleUrl: './form-membres.component.scss'
})
export class FormMembresComponent implements OnInit {

  @Input() usuari!: Usuari;
  @Input() mode!: string;
  @Input() membre!: Membre;

  @Output() successfullyEdited = new EventEmitter<Membre>();
  @Output() successfullyCreated = new EventEmitter<Membre>();

  membreForm!: FormGroup;
  usuariCreador!: Usuari;
  gimnasos!: Gimnas[];
  estat!: any[]; 
  esStaff: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuarisService: UsuarisService,
    private gimnasosService: GimnasosService,
    private tokenService: TokenService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['membre'] && changes['membre'].currentValue) {
      this.initForm();
    }
  }

  ngOnInit(): void {
    this.gimnasos = [];
    this.estat = ['ACTIU', 'INACTIU', 'SENSE'];
    this.getGimnasos();
    if (!this.tokenService.isGymAdmin() && !this.tokenService.isSuperAdmin()) this.esStaff = true;
    this.initForm();
  }

  getGimnasos(): void {
    if (this.tokenService.isSuperAdmin()) {
      this.gimnasosService.getGimnasosCreadorActiu().subscribe(response => {
        this.gimnasos = response;
      });
    }
    else {
      if (this.tokenService.isGymAdmin() && !this.tokenService.isSuperAdmin()) {
        this.gimnasosService.getGimnasosCreadorActiu().subscribe(response => {
          this.gimnasos = response.filter(gimnas => (gimnas.creador.rols.some(rol => rol.rolNom === RolNom.SUPERADMIN) && gimnas.propietari.nom === this.usuari?.nom) || gimnas.creador.nomUsuari === this.tokenService.getUsername());
          console.log(this.gimnasos);
        });
      }
    }
  }

  initForm() {
    if (this.mode === 'editar') {
      this.membreForm = this.fb.group({
        nom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefon: ['', Validators.required],
        adreca: ['', Validators.required],
        dataNaixement: ['', Validators.required],
        observacions: ['']
      });
    }
    else {
      this.membreForm = this.fb.group({
        nom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefon: ['', Validators.required],
        adreca: ['', Validators.required],
        dataNaixement: ['', Validators.required],
        genere: ['', Validators.required],
        gimnas: ['']
      });
      if (!this.esStaff) {
        this.membreForm.get('gimnas')?.setValidators([Validators.required]);
      }
      this.membreForm.updateValueAndValidity();
    }
    if (this.mode === 'editar' && this.membre) {
      const dataNaixement = new Date(this.membre.dataNaixement);
      this.membreForm.patchValue({
        nom: this.membre.nom,
        email: this.membre.email,
        telefon: this.membre.telefon,
        adreca: this.membre.adreca,
        dataNaixement: dataNaixement,
        observacions: this.membre.observacions
      });
    }
  }

  guardarMembre(): void {
    const membreGuardat: Membre = this.membreForm.value;
    membreGuardat.id = this.membre.id;
    membreGuardat.genere = this.membre.genere;
    membreGuardat.creador = this.membre.creador;
    membreGuardat.gimnas = this.membre.gimnas;
    membreGuardat.dataCreacio = this.membre.dataCreacio;
    membreGuardat.estat = this.membre.estat;
    console.log(membreGuardat);
    this.membreForm.reset();
    this.successfullyEdited.emit(membreGuardat);
  }

  crearMembre(): void {
    const membreGuardat: Membre = this.membreForm.value;
    this.usuariCreador = this.usuari;
    membreGuardat.creador = this.usuariCreador;
    if (this.esStaff) membreGuardat.gimnas = this.usuariCreador.gimnasStaff;
    console.log(membreGuardat);
    this.membreForm.reset();
    this.successfullyCreated.emit(membreGuardat);
  }
}

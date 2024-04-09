import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Quota } from '../../../models/quota.model';
import { Usuari } from '../../../models/usuari.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarisService } from '../../../services/usuaris.service';
import { TokenService } from '../../../services/token.service';
import { GimnasosService } from '../../../services/gimnasos.service';
import { Gimnas } from '../../../models/gimnas.model';
import { Rol, RolNom } from '../../../models/rol.model';

@Component({
  selector: 'app-form-quota',
  templateUrl: './form-quota.component.html',
  styleUrl: './form-quota.component.scss'
})
export class FormQuotaComponent implements OnInit {

  @Input() mode!: string;
  @Input() quota!: Quota;

  @Output() successfullyEdited = new EventEmitter<Quota>();
  @Output() successfullyCreated = new EventEmitter<Quota>();

  quotaForm!: FormGroup;
  usuariCreador!: Usuari;
  gimnasos!: Gimnas[];
  tipus: string[] = ["MENSUAL","TRIMESTRAL","ANUAL"];
  esStaff: boolean = false;

  constructor(
    private fb: FormBuilder,
    private gimnasosService: GimnasosService,
    private usuarisService: UsuarisService,
    private tokenService: TokenService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['quota'] && changes['quota'].currentValue) {
      this.initForm();
    }
  }

  ngOnInit(): void {
    this.gimnasos = [];
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
          response.forEach(gimnas => {
            console.log(gimnas);
            console.log(gimnas.creador.nomUsuari, " ", this.tokenService.getUsername());
            console.log(new Rol(RolNom.SUPERADMIN));
            this.usuarisService.getUsuariByNomUsuari(this.tokenService.getUsername()).subscribe(usuari => {
              console.log(usuari.nom, " ", gimnas.propietari.nom);
              if ((gimnas.creador.rols.some(rol => rol.rolNom === RolNom.SUPERADMIN) && gimnas.propietari.nom === usuari.nom) || gimnas.creador.nomUsuari === this.tokenService.getUsername()) {
                this.gimnasos.push(gimnas);
              }
            });
          });
          console.log(this.gimnasos);
        });
      }
    }
  }

  initForm() {
    if (this.mode === 'editar') {
      this.quotaForm = this.fb.group({
        nom: ['', Validators.required],
        preu: ['', Validators.required]
      });
    }
    else {
      this.quotaForm = this.fb.group({
        nom: ['', Validators.required],
        preu: ['', Validators.required],
        tipus: ['', Validators.required],
        gimnas: ['']
      });
      if (!this.esStaff) {
        this.quotaForm.get('gimnas')?.setValidators([Validators.required]);
      }
    }
    if (this.mode === 'editar' && this.quota) {
      this.quotaForm.patchValue({
        nom: this.quota.nom,
        preu: this.quota.preu
      });
    }
  }

  guardarQuota(): void {
    const quotaGuardada: Quota = this.quotaForm.value;
    quotaGuardada.id = this.quota.id;
    quotaGuardada.tipus = this.quota.tipus;
    quotaGuardada.mesos = this.quota.mesos;
    quotaGuardada.gimnas = this.quota.gimnas;
    quotaGuardada.creador = this.quota.creador;
    this.quotaForm.reset();
    this.successfullyEdited.emit(quotaGuardada);
  }

  crearQuota(): void {
    const quotaGuardada: Quota = this.quotaForm.value;
    if (quotaGuardada.tipus === "MENSUAL") quotaGuardada.mesos = 1;
    else if (quotaGuardada.tipus === "TRIMESTRAL") quotaGuardada.mesos = 3;
    else quotaGuardada.mesos = 12;
    this.usuarisService.getUsuariByNomUsuari(this.tokenService.getUsername()).subscribe(response => {
      this.usuariCreador = response;
      quotaGuardada.creador = this.usuariCreador;
      if (this.esStaff) quotaGuardada.gimnas = response.gimnasStaff;
      console.log(quotaGuardada);
      this.quotaForm.reset();
      this.successfullyCreated.emit(quotaGuardada);
    });
  }
}

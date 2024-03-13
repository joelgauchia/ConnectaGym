import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Llicencia } from '../../../models/llicencia.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Propietari } from '../../../models/propietari.model';
import { LlicenciesService } from '../../../services/llicencies.service';
import { TipusLlicenciaService } from '../../../services/tipusLlicencia.service';
import { PropietarisService } from '../../../services/propietaris.service';
import { forkJoin } from 'rxjs';
import { TipusLlicencia } from '../../../models/tipus-llicencia.model';

@Component({
  selector: 'app-form-llicencia',
  templateUrl: './form-llicencia.component.html',
  styleUrl: './form-llicencia.component.scss'
})
export class FormLlicenciaComponent {

  @Output() successfullyCreated = new EventEmitter<Llicencia>();
  
  llicenciaForm!: FormGroup;
  propietaris!: Propietari[];
  tipusLlicencia!: TipusLlicencia[];

  constructor (
    private fb: FormBuilder,
    private llicenciesService: LlicenciesService,
    private propietarisService: PropietarisService,
    private tipusLlicenciaService: TipusLlicenciaService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['llicencia'] && changes['llicencia'].currentValue) {
      this.initForm();
    }
  }

  ngOnInit(): void {
    forkJoin([
      this.propietarisService.getPropietaris(),
      this.tipusLlicenciaService.getTipusLlicencia()
    ]).subscribe(response => {
      this.propietaris = response[0];
      console.log(this.propietaris);
      this.tipusLlicencia = response[1];
      console.log(this.tipusLlicencia);
    });
    this.initForm();
  }

  initForm() {
    this.llicenciaForm = this.fb.group({
      propietari: ['', Validators.required],
      tipusLlicencia: ['', Validators.required]
    })
  }

  crearLlicencia() {
    const llicenciaGuardada: Llicencia = this.llicenciaForm.value;
    llicenciaGuardada.preu = llicenciaGuardada.tipusLlicencia.preu;
    llicenciaGuardada.activa = true;
    console.log(llicenciaGuardada);
    this.llicenciaForm.reset();
    this.successfullyCreated.emit(llicenciaGuardada);
  }
}

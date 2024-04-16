import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Visita } from '../../../models/visita.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-crear-visita-regular',
  templateUrl: './form-crear-visita-regular.component.html',
  styleUrl: './form-crear-visita-regular.component.scss'
})
export class FormCrearVisitaRegularComponent implements OnInit {

  @Output() successfullyCreated = new EventEmitter<number>();

  visitaRegularForm!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.visitaRegularForm = this.fb.group({
      preu: ['', Validators.required]
    });
  }

  crearVisitaRegular() {
    const preu: number = this.visitaRegularForm.get('preu')?.value;
    console.log(preu);
    this.successfullyCreated.emit(preu);
  }
}

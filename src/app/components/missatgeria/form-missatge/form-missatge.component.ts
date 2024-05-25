import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Membre } from '../../../models/membre.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Missatge } from '../../../models/missatge.model';
import { UsuarisService } from '../../../services/usuaris.service';
import { TokenService } from '../../../services/token.service';
import { Usuari } from '../../../models/usuari.model';

@Component({
  selector: 'app-form-missatge',
  templateUrl: './form-missatge.component.html',
  styleUrl: './form-missatge.component.scss'
})
export class FormMissatgeComponent implements OnInit {

  @Input() usuari!: Usuari;
  @Input() membres!: Membre[];
  @Output() successfullyCreated = new EventEmitter<Missatge>(); 

  missatgeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarisService: UsuarisService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.missatgeForm = this.fb.group({
      membre: ['', Validators.required],
      titol: [''],
      missatge: ['', Validators.required]
    })
  }

  guardarMissatge(): void {
    const nouMissatge: Missatge = this.missatgeForm.value;
    nouMissatge.remitent = this.usuari;
    nouMissatge.dataEnviament = new Date();
    console.log(nouMissatge);
    this.missatgeForm.reset();
    this.successfullyCreated.emit(nouMissatge);
  }
}

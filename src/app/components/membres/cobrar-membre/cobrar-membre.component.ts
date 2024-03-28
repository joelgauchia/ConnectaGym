import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuotesService } from '../../../services/quotes.service';
import { Quota } from '../../../models/quota.model';
import { Membre } from '../../../models/membre.model';

@Component({
  selector: 'app-cobrar-membre',
  templateUrl: './cobrar-membre.component.html',
  styleUrl: './cobrar-membre.component.scss'
})
export class CobrarMembreComponent implements OnInit {

  @Input() membre!: Membre;
  @Output() successfullyCreated = new EventEmitter<Quota>();

  quotes!: Quota[];
  cobrarForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private quotesService: QuotesService
  ) { }

  ngOnInit() {
    const nomGimnas: string = this.membre.gimnas.nom;
    this.quotesService.getQuotesByGimnasNom(nomGimnas).subscribe(response => {
      this.quotes = response;
    });
    this.initForm();
  }

  initForm() {
    this.cobrarForm = this.fb.group({
      quota: ['', Validators.required]
    });
  }

  cobrarMembre(): void {
    const quotaSeleccionada: Quota = this.cobrarForm.value;
    console.log(quotaSeleccionada);
    this.cobrarForm.reset();
    this.successfullyCreated.emit(quotaSeleccionada);
  }
}

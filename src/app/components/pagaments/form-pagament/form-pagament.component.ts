import { Component, Input, OnInit } from '@angular/core';
import { Pagament } from '../../../models/pagament.model';

@Component({
  selector: 'app-form-pagament',
  templateUrl: './form-pagament.component.html',
  styleUrl: './form-pagament.component.scss'
})
export class FormPagamentComponent implements OnInit {

  @Input() pagament!: Pagament;

  ngOnInit(): void {
    
  }

}

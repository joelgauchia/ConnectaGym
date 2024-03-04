import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { SelectedComponentService } from '../services/selected-component.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  selectedComponent: string = 'dashboard';

  constructor(private selectedComponentService: SelectedComponentService) { }

  ngOnInit(): void {
    this.selectedComponent = this.selectedComponentService.selectedComponent; 
  }
}

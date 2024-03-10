import { Component, OnInit } from '@angular/core';
import { SelectedComponentService } from '../services/selected-component.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  selectedComponent: string = '';

  constructor (private selectedComponentService: SelectedComponentService) { }

  ngOnInit(): void {
    this.selectedComponentService.selectedComponent$.subscribe(componentName => {
      this.selectedComponent = componentName;
    });
  }
}

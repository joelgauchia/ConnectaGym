import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  nomUsuari: string = '';

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    
  }
}

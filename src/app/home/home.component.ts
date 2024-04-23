import { Component, OnInit } from '@angular/core';
import { SelectedComponentService } from '../services/selected-component.service';
import { TokenService } from '../services/token.service';
import { LlicenciesService } from '../services/llicencies.service';
import { Llicencia } from '../models/llicencia.model';
import { UsuarisService } from '../services/usuaris.service';
import { Usuari } from '../models/usuari.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  selectedComponent: string = '';
  llicencies!: Llicencia[];
  usuari!: Usuari;

  constructor (
    private selectedComponentService: SelectedComponentService,
    private llicenciesService: LlicenciesService,
    private usuarisService: UsuarisService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.getUsuariLoguejat();
    this.selectedComponentService.selectedComponent$.subscribe(componentName => {
      this.selectedComponent = componentName;
      this.comprovarLlicenciesExpirades();
    });
  }

  getUsuariLoguejat(): void {
    this.usuarisService.getUsuariByNomUsuari(this.tokenService.getUsername()).subscribe(usuari => {
      this.usuari = usuari;
      console.log(this.usuari);
    });
  }

  comprovarLlicenciesExpirades(): void {
    this.llicenciesService.getLlicencies().subscribe(response => {
      this.llicencies = response;
      console.log(this.llicencies);

      this.llicencies.forEach(llicencia => {
        const dataActual = new Date().getTime();
        const dataVenciment = new Date(llicencia.dataVenciment).getTime();
        if (llicencia.activa && dataVenciment < dataActual) {
          llicencia.activa = false;
          console.log("Llicencia inactiva: ", llicencia);
          this.llicenciesService.setInactiva(llicencia).subscribe(() => {});
          const inactiu: Usuari = llicencia.propietari.creador;
          console.log("usuari.inactiu");
          console.log(llicencia.propietari.creador);
          if (inactiu.actiu) {
            inactiu.actiu = false;
            this.usuarisService.actualitzarUsuari(inactiu.nomUsuari, inactiu).subscribe(usuari => {
              console.log(this.tokenService.getUsername());
              console.log(usuari);
              if (this.tokenService.getUsername() === inactiu.nomUsuari) {
                this.tokenService.logOut();
              }
            });
          }
        }
      });
    });
  }
}

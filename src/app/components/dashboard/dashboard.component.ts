import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { UsuarisService } from '../../services/usuaris.service';
import { Usuari } from '../../models/usuari.model';
import { VisitesService } from '../../services/visites.service';
import { PropietarisService } from '../../services/propietaris.service';
import { LlicenciesService } from '../../services/llicencies.service';
import { GimnasosService } from '../../services/gimnasos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  usuari!: Usuari;
  ventesTotals!: number;
  gimnasosTotals!: number;
  propietarisTotals!: number;
  dataActual: Date = new Date();

  constructor(
    private visitesService: VisitesService,
    private propietarisService: PropietarisService,
    private llicenciesService: LlicenciesService,
    private gimnasosService: GimnasosService,
    private tokenService: TokenService,
    private usuarisService: UsuarisService
  ) { }

  ngOnInit(): void {
    this.usuarisService.getUsuariByNomUsuari(this.tokenService.getUsername()).subscribe(usuari => {
      this.usuari = usuari;
    });
    this.getGimnasos();
    this.getPropietaris();
    this.getLlicencies();
  }

  getGimnasos(): void {
    this.gimnasosService.getGimnasos().subscribe(gimnasos => {
      this.gimnasosTotals = gimnasos.length;
    });
  }

  getPropietaris(): void {
    this.propietarisService.getPropietaris().subscribe(propietaris => {
      this.propietarisTotals = propietaris.length;
    });
  }

  getLlicencies(): void {
    this.ventesTotals = 0;
    this.llicenciesService.getLlicencies().subscribe(llicencies => {
      console.log(llicencies);
      llicencies.forEach(llicencia => {
        this.ventesTotals += llicencia.preu;
      });
    });
  }
}

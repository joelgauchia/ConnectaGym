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

  data: any;
  options: any;
  ventesPerMes: any;

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
    this.getVentesLlicencies();
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

  getVentesLlicencies(): void {
    this.llicenciesService.getLlicencies().subscribe(llicencies => {
        this.ventesPerMes = new Array(12).fill(0); 
        llicencies.forEach(llicencia => {
            const dataVenta = new Date (llicencia.dataInici);
            const mes = dataVenta.getMonth();
            this.ventesPerMes[mes] += llicencia.preu;
            console.log(mes);
            this.ventesTotals += llicencia.preu;
        });
        this.iniciarCharts();
    });
}

  iniciarCharts(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    this.data = {
        labels: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol','Agost','Setembre','Octubre','Novembre','Desembre'],
        datasets: [
            {
                label: 'Facturació (€)',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                data: this.ventesPerMes
            }
        ]
    };

    this.options = {
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }

        }
    };
  }
}

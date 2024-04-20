import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { UsuarisService } from '../../services/usuaris.service';
import { Usuari } from '../../models/usuari.model';
import { VisitesService } from '../../services/visites.service';
import { PropietarisService } from '../../services/propietaris.service';
import { LlicenciesService } from '../../services/llicencies.service';
import { GimnasosService } from '../../services/gimnasos.service';
import { MembresService } from '../../services/membres.service';
import { PagamentsService } from '../../services/pagaments.service';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  dataActual: Date = new Date();
  usuari!: Usuari;
  ventesTotals!: number;
  gimnasosTotals!: number;
  propietarisTotals!: number;
  membresTotals!: number;
  facturacioPropietari!: number;
  visitesTotalsPropietari!: number;
  visitesTotalsStaff!: number;
  visitesMensuals!: number;
  membresNous!: number;

  dataBarres: any;
  dataDonut: any;
  dataVisitesMembresPropietari: any;
  dataVisitesMembresStaff: any;
  dataVisitesMensualsStaff: any;

  optionsBarres: any;
  optionsDonut: any;
  optionsDonutPropietari: any;
  optionsBarresVisitesMensualsStaff: any;
  ventesPerMes: any;
  visitesPerMes: any;

  esGymAdmin: boolean = false;
  esSuperAdmin: boolean = false;

  constructor(
    private visitesService: VisitesService,
    private membresService: MembresService,
    private pagamentsService: PagamentsService,
    private propietarisService: PropietarisService,
    private llicenciesService: LlicenciesService,
    private gimnasosService: GimnasosService,
    private tokenService: TokenService,
    private usuarisService: UsuarisService
  ) { }

  ngOnInit(): void {
    this.usuarisService.getUsuariByNomUsuari(this.tokenService.getUsername()).pipe(
        map(usuari => {
            this.usuari = usuari;
        })
    ).subscribe(() => {
        if (this.tokenService.isGymAdmin()) this.esGymAdmin = true;
        if (this.tokenService.isSuperAdmin()) this.esSuperAdmin = true;

        if (this.esSuperAdmin) {
            this.getGimnasos();
            this.getPropietaris();
            this.getVentesLlicencies();
        }
        else if (this.esGymAdmin && !this.esSuperAdmin) {
            this.getPagamentsMensuals();
            this.getMembresPropietari();
            this.getVisites();
        }
        else {
            this.getMembresGimnasStaff();
            this.getVisites();
        }
    });
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
    this.ventesTotals = 0;
    this.llicenciesService.getLlicencies().subscribe(llicencies => {
        this.ventesPerMes = new Array(12).fill(0); 
        llicencies.forEach(llicencia => {
            const dataVenta = new Date(llicencia.dataInici);
            const mes = dataVenta.getMonth();
            this.ventesPerMes[mes] += llicencia.preu;
            this.ventesTotals += llicencia.preu;
        });
        this.iniciarCharts();
    });
  }

  getMembresPropietari(): void {
    this.membresTotals = 0;
    this.membresNous = 0;
    this.membresService.getMembres().subscribe(membres => {
      membres.forEach(membre => {
        if (membre.gimnas.propietari.nom === this.usuari.nom) {
          this.membresTotals++;
          const mesCreacio = new Date(membre.dataCreacio).getMonth();
          if (mesCreacio === this.dataActual.getMonth()) this.membresNous++;
        }
      });
    });
  }

  getPagamentsMensuals(): void {
    this.ventesPerMes = 0;
    this.facturacioPropietari = 0;
    this.pagamentsService.getPagaments().subscribe(pagaments => {
      this.ventesPerMes = new Array(12).fill(0); 
      pagaments.forEach(pagament => {
        if (pagament.gimnas.propietari.nom === this.usuari.nom) {
          const mesPagament = new Date(pagament.dataInici).getMonth();
          const mesActual = new Date().getMonth();
          this.ventesPerMes[mesPagament] += pagament.quantitat;
          if (mesPagament === mesActual) this.facturacioPropietari += pagament.quantitat;
        }
        console.log(this.facturacioPropietari);
      });
      this.iniciarCharts();
    });
  }

  getVisites(): void {
    this.visitesTotalsPropietari = 0;
    this.visitesTotalsStaff = 0;
    this.visitesMensuals = 0;
    this.visitesPerMes = 0;
    this.visitesService.getVisites().subscribe(visites => {
      console.log("visites");
      this.visitesPerMes = new Array(12).fill(0); 
      visites.forEach(visita => {
        if (visita.gimnas.propietari.nom === this.usuari.nom) this.visitesTotalsPropietari++;
        if (!this.esGymAdmin && !this.esSuperAdmin) {
          if (visita.gimnas.nom === this.usuari.gimnasStaff.nom) {
            this.visitesTotalsStaff++;
            const mesVisita = new Date(visita.dataVisita).getMonth();
            this.visitesPerMes[mesVisita]++;
            console.log(this.visitesPerMes);
            if (mesVisita === this.dataActual.getMonth()) this.visitesMensuals++;
          }
        }
      });
      this.iniciarCharts();
    });
  }

  getMembresGimnasStaff(): void {
    this.membresNous = 0;
    console.log(this.usuari);
    this.membresService.getMembresGimnas(this.usuari.gimnasStaff).subscribe(membres => {
      this.membresTotals = membres.length;
      membres.forEach(membre => {
        const mesCreacio = new Date(membre.dataCreacio).getMonth();
        if (mesCreacio === this.dataActual.getMonth()) this.membresNous++;
      });
    });
  }

  iniciarCharts(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    this.dataBarres = {
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

    this.dataVisitesMensualsStaff = {
      labels: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol','Agost','Setembre','Octubre','Novembre','Desembre'],
      datasets: [
          {
              label: 'Visites',
              backgroundColor: documentStyle.getPropertyValue('--blue-500'),
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              data: this.visitesPerMes
          }
      ]
  };

    this.dataDonut = {
      labels: ['Propietaris','Gimnasos'],
      datasets: [
          {
              data: [this.propietarisTotals, this.gimnasosTotals],
              backgroundColor: [documentStyle.getPropertyValue('--purple-500'), documentStyle.getPropertyValue('--green-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--purple-400'), documentStyle.getPropertyValue('--green-400')]
          }
      ]
    }

    this.dataVisitesMembresPropietari = {
      labels: ['Membres', 'Visites'],
      datasets: [
          {
              data: [this.membresTotals, this.visitesTotalsPropietari],
              backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--purple-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--purple-400')]
          }
      ]
    }

    this.dataVisitesMembresStaff = {
      labels: ['Membres', 'Visites'],
      datasets: [
          {
              data: [this.membresTotals, this.visitesTotalsStaff],
              backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--purple-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--purple-400')]
          }
      ]
    }

    this.optionsBarres = {
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
            title: {
              display: true,
              text: 'Facturació anual per mesos'
            },
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

    this.optionsBarresVisitesMensualsStaff = {
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
          title: {
            display: true,
            text: 'Visites anuals per mesos'
          },
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

    this.optionsDonut = {
        plugins: {
          title: {
            display: true,
            text: 'Total de propietaris i gimnasos'
          },
            legend: {
                labels: {
                    color: textColor
                }
            }
        }
    };

    this.optionsDonutPropietari = {
      plugins: {
        title: {
          display: true,
          text: 'Total de visites i membres'
        },
          legend: {
              labels: {
                  color: textColor
              }
          }
      }
    };
  }
}

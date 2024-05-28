import { Component, OnInit, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { TokenService } from '../../services/token.service';
import { SelectedComponentService } from '../../services/selected-component.service';
import { UsuarisService } from '../../services/usuaris.service';
import { Usuari } from '../../models/usuari.model';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  sidebarVisible: boolean = true;
  usuariActual: string = '';
  esGymAdmin: boolean = false;
  esSuperAdmin: boolean = false;
  usuari!: Usuari;
  nomUsuari: string = '';
  items: MenuItem[] | undefined;

  constructor(
    private usuarisService: UsuarisService, 
    private tokenService: TokenService, 
    private selectedComponentService: SelectedComponentService
  ) { } 

  ngOnInit(): void {
    this.usuariActual = this.tokenService.getUsername();
    console.log(this.usuariActual);

    this.usuarisService.getUsuariByNomUsuari(this.usuariActual).subscribe(response => {
      this.usuari = response;
      this.nomUsuari = this.usuari.nom
      console.log(this.usuari);
    });

    console.log(this.usuariActual);
    this.esGymAdmin = this.tokenService.isGymAdmin();
    this.esSuperAdmin = this.tokenService.isSuperAdmin();

    this.initMenu();
  }

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  selectComponent(component: string): void {
    this.selectedComponentService.showComponent(component); // Actualitza la variable del servei
    console.log(this.selectedComponentService.getActiveComponent());
  }

  logOutUser(): void {
    this.selectedComponentService.showComponent('dashboard');
    this.tokenService.logOut();
  }

  initMenu(): void {
    const gymAdminItems: MenuItem[] = [
      {
        separator: true
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-chart-bar',
        command: () => {
          this.selectComponent('dashboard');
        }
      },
      {
        label: 'Staff',
        icon: 'pi pi-wrench',
        command: () => {
          this.selectComponent('usuaris');
        }
      },
      {
        label: 'Gimnasos',
        icon: 'pi pi-bolt',
        command: () => {
          this.selectComponent('gimnasos');
        }
      },
      {
        label: 'Membres',
        icon: 'pi pi-users',
        command: () => {
          this.selectComponent('membres');
        }
      },
      {
        label: 'Quotes',
        icon: 'pi pi-money-bill',
        command: () => {
          this.selectComponent('quotes');
        }
      },
      {
        label: 'Pagaments',
        icon: 'pi pi-credit-card',
        command: () => {
          this.selectComponent('pagaments');
        }
      },
      {
        separator: true
      },
    ];

    const superAdminItems: MenuItem[] = [
      {
        separator: true
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-chart-bar',
        command: () => {
          this.selectComponent('dashboard');
        }
      },
      {
        label: 'Usuaris',
        icon: 'pi pi-wrench',
        command: () => {
          this.selectComponent('usuaris');
        }
      },
      {
        label: 'Llicències',
        icon: 'pi pi-bookmark',
        command: () => {
          this.selectComponent('llicencies');
        }
      },
      {
        label: 'Propietaris',
        icon: 'pi pi-user',
        command: () => {
          this.selectComponent('propietaris');
        }
      },
      {
        label: 'Gimnasos',
        icon: 'pi pi-bolt',
        command: () => {
          this.selectComponent('gimnasos');
        }
      },
      {
        label: 'Membres',
        icon: 'pi pi-users',
        command: () => {
          this.selectComponent('membres');
        }
      },
      {
        label: 'Quotes',
        icon: 'pi pi-money-bill',
        command: () => {
          this.selectComponent('quotes');
        }
      },
      {
        label: 'Pagaments',
        icon: 'pi pi-credit-card',
        command: () => {
          this.selectComponent('pagaments');
        }
      },
      {
        separator: true
      },
    ];

    const staffItems: MenuItem[] = [
      {
        separator: true
      },
      {
        label: 'Membres',
        icon: 'pi pi-users',
        command: () => {
          this.selectComponent('membres');
        }
      },
      {
        label: 'Quotes',
        icon: 'pi pi-money-bill',
        command: () => {
          this.selectComponent('quotes');
        }
      },
      {
        label: 'Pagaments',
        icon: 'pi pi-credit-card',
        command: () => {
          this.selectComponent('pagaments');
        }
      },
      {
        label: 'Visites',
        icon: 'pi pi-calendar',
        command: () => {
          this.selectComponent('visites');
        }
      },
      {
        label: 'Missatgeria',
        icon: 'pi pi-inbox',
        command: () => {
          this.selectComponent('missatgeria');
        }
      },
      {
        separator: true
      },
    ];

    if (this.esSuperAdmin) {
      this.items = superAdminItems;
    } else if (this.esGymAdmin) {
      this.items = gymAdminItems;
    } else {
      this.items = staffItems;
    }
  }
}
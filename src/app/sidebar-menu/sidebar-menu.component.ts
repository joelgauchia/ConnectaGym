import { Component, OnInit, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { TokenService } from '../services/token.service';
import { SelectedComponentService } from '../services/selected-component.service';
import { UsuarisService } from '../services/usuaris.service';
import { Usuari } from '../models/usuari.model';

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

  constructor(private usuarisService: UsuarisService, private tokenService: TokenService, private selectedComponentService: SelectedComponentService) { } 

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
  }

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  selectComponent(component: string): void {
    this.selectedComponentService.showComponent(component); // Actualitza la variable del servei
    console.log(this.selectedComponentService.getActiveComponent());
  }
}
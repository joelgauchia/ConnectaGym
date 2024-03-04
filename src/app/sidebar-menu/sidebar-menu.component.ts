import { Component, OnInit, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { TokenService } from '../services/token.service';
import { SelectedComponentService } from '../services/selected-component.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  public sidebarVisible: boolean = true;
  usuariActual: string = '';

  constructor(private tokenService: TokenService, private selectedComponentService: SelectedComponentService) { } 

  ngOnInit(): void {
    this.usuariActual = this.tokenService.getUsername();
    console.log(this.usuariActual);
  }

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  selectComponent(component: string): void {
    this.selectedComponentService.selectedComponent = component; // Actualitza la variable del servei
  }
}
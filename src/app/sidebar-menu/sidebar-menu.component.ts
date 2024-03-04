import { Component, OnInit, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  public sidebarVisible: boolean = true;
  faDumbbell = faDumbbell;
  usuariActual: string = '';

  isLogged = false;
  isAdmin = false;


  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isGymAdmin();
    this.usuariActual = this.tokenService.getUsername();
    console.log(this.usuariActual);
  }

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }
}
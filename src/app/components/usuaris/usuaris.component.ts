import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsuarisService } from '../../services/usuaris.service';
import { Usuari } from '../../models/usuari.model';
import * as XLSX from 'xlsx';
import { ExcelService } from '../../services/excel.service';
import { TokenService } from '../../services/token.service';
import { PropietarisService } from '../../services/propietaris.service';

@Component({
  selector: 'app-usuaris',
  templateUrl: './usuaris.component.html',
  styleUrl: './usuaris.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class UsuarisComponent implements OnInit {

  usuaris!: Usuari[];
  usuari!: Usuari;
  submitted: boolean = false;

  selectedRol: string = '';

  rols!: any[];

  crearUsuariDialog: boolean = false;
  editarUsuariDialog: boolean = false;

  constructor(
    private usuarisService: UsuarisService, 
    private propietarisService: PropietarisService,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService, 
    private excelService: ExcelService,
    private tokenService: TokenService
    ) {}

  ngOnInit(): void {
    this.rols = [
      { label: 'SUPERADMIN', value: "SUPERADMIN" },
      { label: 'GYMADMIN', value: "GYMADMIN" },
      { label: 'STAFF', value: "STAFF"}
    ];
    this.carregarUsuaris();
  }

  carregarUsuaris(): void {
    this.usuarisService.getUsuaris().subscribe(response => {
      this.usuaris = response;
      console.log(this.usuaris);
    });
  }

  getRol(rols: any[]): string {
    if (rols.some(rol => rol.rolNom === 'SUPERADMIN')) {
      return 'SUPERADMIN';
    } else if (rols.some(rol => rol.rolNom === 'GYMADMIN') && !rols.some(rol => rol.rolNom === 'SUPERADMIN')) {
      return 'GYMADMIN';
    } else {
      return 'STAFF';
    }
  }

  crearUsuari() {
    this.crearUsuariDialog = true;
  }

  usuariCreat(event: any) {
    const usuariGuardat = event.usuari;
    const propietari = event.propietari;

    console.log(usuariGuardat);

    this.usuarisService.crearUsuari(usuariGuardat).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Fet!', detail: "Usuari creat correctament" });
      this.carregarUsuaris();
      console.log(response);

      if (propietari) {
        this.propietarisService.crearPropietari(propietari).subscribe(response => {
          console.log(response);
        });
      }
      this.crearUsuariDialog = false;
    },
    error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Usuari ja existent", life: 3000 });
    });
  }

  editarUsuari(usuari: Usuari) {
    this.usuari = usuari;
    console.log(this.usuari);
    this.editarUsuariDialog = true;
  }

  usuariEditat(event: any) {
    this.usuarisService.actualitzarUsuari(event.nomUsuari, event).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Fet!', detail: "Usuari editat correctament", life: 3000 });
      this.carregarUsuaris();
      console.log(response);
    });
    this.editarUsuariDialog = false;
  }

  eliminarUsuari(usuari: Usuari) {
    this.confirmationService.confirm({
      message: "Segur que vols eliminar l'usuari " + usuari.nom + '?',
      header: 'Confirma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarisService.eliminarUsuari(usuari).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Fet!', detail: response, life: 3000 });
          this.carregarUsuaris();

          const username = this.tokenService.getUsername();
          if (username === usuari.nomUsuari) {
              this.tokenService.logOut();
          }
        });
      }
    });
  }

  exportToExcel(): void {
    const headers = ['Nom', 'Nom Usuari', 'Email', 'Rol', 'Actiu', 'Creat', 'Modificat'];
    const data = this.usuaris.map(usuari => [
      usuari.nom,
      usuari.nomUsuari,
      usuari.email,
      this.getRol(usuari.rols),
      usuari.actiu ? 'Actiu' : 'Inactiu',
      usuari.dataCreacio,
      usuari.dataModificacio
    ]);
    const fileName = 'usuaris';
    const sheetName = 'Usuaris';
    this.excelService.exportToExcel(headers, data, fileName, sheetName);
  }
}

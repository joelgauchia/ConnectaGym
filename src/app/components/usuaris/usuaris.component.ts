import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsuarisService } from '../../services/usuaris.service';
import { Usuari } from '../../models/usuari.model';
import * as XLSX from 'xlsx';
import { ExcelService } from '../../services/excel.service';

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
  usuariDialog: boolean = false;
  selectedRol: string = '';

  rols!: any[];

  constructor(private usuarisService: UsuarisService, private messageService: MessageService, private confirmationService: ConfirmationService, private excelService: ExcelService) {}

  ngOnInit(): void {
    this.rols = [
      { label: 'SUPERADMIN', value: "SUPERADMIN" },
      { label: 'GYMADMIN', value: "GYMADMIN" },
      { label: 'STAFF', value: "STAFF"}
    ];

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

  setRol() {

  }

  crearUsuari() {
    this.usuariDialog = true;
  }

  editarUsuari(usuari: Usuari) {
    this.usuari = { ...usuari };
    this.usuariDialog = true;
  }

  eliminarUsuari(usuari: Usuari) {
    
  }

  hideDialog() {
    this.usuariDialog = false;
    this.submitted = false;
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

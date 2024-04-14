import { Component, OnInit } from '@angular/core';
import { MembresService } from '../../services/membres.service';
import { Membre } from '../../models/membre.model';
import { Missatge } from '../../models/missatge.model';
import { EmailService } from '../../services/email.service';
import { MessageService } from 'primeng/api';
import { TokenService } from '../../services/token.service';
import { UsuarisService } from '../../services/usuaris.service';
import { forkJoin, of, switchMap } from 'rxjs';
import { RolNom } from '../../models/rol.model';

@Component({
  selector: 'app-missatgeria',
  templateUrl: './missatgeria.component.html',
  styleUrl: './missatgeria.component.scss',
  providers: [MessageService]
})
export class MissatgeriaComponent implements OnInit {

  membres!: Membre[];

  constructor(
    private membresService: MembresService,
    private emailService: EmailService,
    private messageService: MessageService,
    private tokenService: TokenService,
    private usuarisService: UsuarisService
  ) { }

  ngOnInit(): void {
    this.getMembres();
  }

  getMembres(): void {
    if (this.tokenService.isStaff() && !this.tokenService.isGymAdmin()) {
      console.log("staff");
      this.usuarisService.getUsuariActiuByNomUsuari(this.tokenService.getUsername()).subscribe(usuari => {
        console.log(usuari);
        this.membresService.getMembresGimnas(usuari.gimnasStaff).subscribe(membres => {
          console.log(membres);
          this.membres = membres;
        });
      });
    }
  }

  enviarCorreu(event: Missatge): void {
    this.emailService.enviarEmail(event).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Fet', detail: response, life: 3000 });
    }, 
    error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error, life: 5000 });
    });
  }
}

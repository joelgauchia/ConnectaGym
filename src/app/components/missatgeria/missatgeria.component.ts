import { Component, OnInit } from '@angular/core';
import { MembresService } from '../../services/membres.service';
import { Membre } from '../../models/membre.model';
import { Missatge } from '../../models/missatge.model';
import { EmailService } from '../../services/email.service';
import { MessageService } from 'primeng/api';

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
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getMembres();
  }

  getMembres(): void {
    this.membresService.getMembresCreadorActiu().subscribe(response => {
      this.membres = response;
      console.log(this.membres);
    });
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

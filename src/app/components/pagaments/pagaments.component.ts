import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PagamentsService } from '../../services/pagaments.service';
import { Pagament } from '../../models/pagament.model';

@Component({
  selector: 'app-pagaments',
  templateUrl: './pagaments.component.html',
  styleUrl: './pagaments.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class PagamentsComponent implements OnInit {

  pagaments!: Pagament[];
  pagament!: Pagament;

  editarPagamentDialog: boolean = false;

  constructor(
    private pagamentsService: PagamentsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.pagamentsService.getPagaments().subscribe(response => {
      this.pagaments = response;
      console.log(this.pagaments);
    });
  }

  editarPagament(event: any) {

  }

  pagamentEditat(event: any) {

  }

  eliminarPagament(event: any) {

  }

  exportToExcel() {

  }
}

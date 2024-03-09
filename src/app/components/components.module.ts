import { NgModule } from '@angular/core';

import { PrimengModule } from '../primeng/primeng.module';
import { SidebarMenuModule } from '../sidebar-menu/sidebar-menu.module';
import { AjustamentsComponent } from './ajustaments/ajustaments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GimnasosComponent } from './gimnasos/gimnasos.component';
import { LlicenciesComponent } from './llicencies/llicencies.component';
import { MembresComponent } from './membres/membres.component';
import { MissatgeriaComponent } from './missatgeria/missatgeria.component';
import { PagamentsComponent } from './pagaments/pagaments.component';
import { PropietarisComponent } from './propietaris/propietaris.component';
import { QuotesComponent } from './quotes/quotes.component';
import { UsuarisComponent } from './usuaris/usuaris.component';
import { VisitesComponent } from './visites/visites.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AjustamentsComponent,
    DashboardComponent,
    GimnasosComponent,
    LlicenciesComponent,
    MembresComponent,
    MissatgeriaComponent,
    PagamentsComponent,
    PropietarisComponent,
    QuotesComponent,
    UsuarisComponent,
    VisitesComponent
  ],
  imports: [
    PrimengModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    AjustamentsComponent,
    DashboardComponent,
    GimnasosComponent,
    LlicenciesComponent,
    MembresComponent,
    MissatgeriaComponent,
    PagamentsComponent,
    PropietarisComponent,
    QuotesComponent,
    UsuarisComponent,
    VisitesComponent
  ]
})
export class ComponentsModule { }
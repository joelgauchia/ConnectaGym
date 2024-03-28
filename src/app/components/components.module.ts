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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormUsuariComponent } from './usuaris/form-usuari/form-usuari.component';
import { FormPropietariComponent } from './propietaris/form-propietari/form-propietari.component';
import { TipusLlicenciesComponent } from './llicencies/tipus-llicencies/tipus-llicencies.component';
import { FormLlicenciaComponent } from './llicencies/form-llicencia/form-llicencia.component';
import { FormTipusLlicenciaComponent } from './llicencies/tipus-llicencies/form-tipus-llicencia/form-tipus-llicencia.component';
import { FormGimnasComponent } from './gimnasos/form-gimnas/form-gimnas.component';
import { FormMembresComponent } from './membres/form-membre/form-membres.component';
import { CobrarMembreComponent } from './membres/cobrar-membre/cobrar-membre.component';
import { FormQuotaComponent } from './quotes/form-quota/form-quota.component';

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
    VisitesComponent, 
    FormUsuariComponent, 
    FormPropietariComponent, 
    TipusLlicenciesComponent, 
    FormLlicenciaComponent, 
    FormTipusLlicenciaComponent, 
    FormGimnasComponent, 
    FormMembresComponent, 
    CobrarMembreComponent, FormQuotaComponent
  ],
  imports: [
    PrimengModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
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
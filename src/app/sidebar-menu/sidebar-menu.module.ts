import { NgModule } from '@angular/core';
import { SidebarMenuComponent } from './sidebar-menu.component';

import { PrimengModule } from '../primeng/primeng.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SidebarMenuComponent
  ],
  imports: [
    PrimengModule,
    CommonModule
  ],
  exports: [
   SidebarMenuComponent
  ]
})
export class SidebarMenuModule { }
import { NgModule } from '@angular/core';
import { SidebarMenuComponent } from './sidebar-menu.component';

import { PrimengModule } from '../primeng/primeng.module';

@NgModule({
  declarations: [
    SidebarMenuComponent
  ],
  imports: [
    PrimengModule
  ],
  exports: [
   SidebarMenuComponent
  ]
})
export class SidebarMenuModule { }
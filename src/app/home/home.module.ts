import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';

import { PrimengModule } from '../primeng/primeng.module';
import { ComponentsModule } from '../components/components.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    PrimengModule,
    ComponentsModule,
    CommonModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
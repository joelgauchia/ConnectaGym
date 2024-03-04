import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';

import { PrimengModule } from '../primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    PrimengModule,
    FormsModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
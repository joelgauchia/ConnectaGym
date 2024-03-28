import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PrimengModule } from './primeng/primeng.module';
import { HomeModule } from './home/home.module';
import { SidebarMenuModule } from './sidebar-menu/sidebar-menu.module';
import { LoginModule } from './login/login.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { CobrarMembreComponent } from './components/membres/cobrar-membre/cobrar-membre.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    PrimengModule,
    LoginModule,
    HomeModule,
    SidebarMenuModule,
    FormsModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

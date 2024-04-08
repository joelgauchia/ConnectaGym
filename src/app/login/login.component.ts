import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginUsuari } from '../models/login-usuari.model';
import { TokenService } from '../services/token.service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarisService } from '../services/usuaris.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginUsuari: LoginUsuari | undefined;
  rols: string[] = [];

  constructor(
    private tokenService: TokenService, 
    private authService: AuthService, 
    private router: Router,
    private messageService: MessageService,
    private usuarisService: UsuarisService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required)
    });
  }

  login(): void {
    this.usuarisService.getUsuariActiuByNomUsuari(this.loginForm.value.username).subscribe(usuari => {
      console.log(usuari);
      if (usuari !== null) {
        this.loginUsuari = new LoginUsuari(this.loginForm.value.username, this.loginForm.value.password);
        this.authService.login(this.loginUsuari).subscribe(response => {
          this.tokenService.setToken(response.token);
          this.router.navigate(['/']);
          console.log(this.loginForm.value.username, this.loginForm.value.password);
        });
      }
      else {
        this.usuarisService.getUsuariByNomUsuari(this.loginForm.value.username).subscribe(response => {
          if (response === null) this.messageService.add({ severity: 'error', summary: 'Login Error', detail: "Usuari inexistent" });
          else this.messageService.add({ severity: 'error', summary: 'Login Error', detail: "Ha expirat la llicència per a aquest usuari. Posi's en contacte amb un administrador", life: 5000 });
        });
      }
    });
  }
}
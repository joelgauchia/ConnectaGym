import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginUsuari } from '../models/login-usuari.model';
import { TokenService } from '../services/token.service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLogged: boolean = false;
  loginFailed: boolean = false;
  loginUsuari: LoginUsuari | undefined;
  rols: string[] = [];

  constructor(
    private tokenService: TokenService, 
    private authService: AuthService, 
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required)
    });
  }

  login(): void {
    this.loginUsuari = new LoginUsuari(this.loginForm.value.username, this.loginForm.value.password);
    this.authService.login(this.loginUsuari).subscribe(response => {
      this.tokenService.setToken(response.token);
      this.router.navigate(['/home']);
      console.log(this.loginForm.value.username, this.loginForm.value.password);
    },
    error => {
      this.messageService.add({ severity: 'error', summary: 'Login Error', detail: "Error d'inici de sessió" });
      console.log("message");
    });
  }
}
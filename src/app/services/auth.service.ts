import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginUsuari } from '../models/login-usuari.model';
import { NouUsuari } from '../models/nou-usuari.model';
import { Jwt } from '../models/jwt.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authURL;

  constructor(private httpClient: HttpClient) { }

  public register(nouUsuari: NouUsuari): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'register', nouUsuari);
  }

  public login(loginUsuari: LoginUsuari): Observable<Jwt> {
    return this.httpClient.post<Jwt>(this.authURL + 'login', loginUsuari);
  }

  public refresh(dto: Jwt): Observable<Jwt> {
    return this.httpClient.post<Jwt>(this.authURL + 'refresh', dto);
  }
}
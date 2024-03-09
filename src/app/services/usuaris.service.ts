import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuari } from '../models/usuari.model';
import { environment } from '../environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarisService {

  usuarisURL = environment.usuarisURL;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getUsuariByNomUsuari(nomUsuari: string): Observable<Usuari> {
    const url = this.usuarisURL + nomUsuari;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    return this.http.get<Usuari>(url, { headers });
  }

  getUsuaris(): Observable<Usuari[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    return this.http.get<Usuari[]>(this.usuarisURL + 'llistat', { headers });
  }
}
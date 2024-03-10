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

  actualitzarUsuari(nomUsuari: string, usuari: Usuari): Observable<Usuari> {
    const url = this.usuarisURL + nomUsuari;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    return this.http.put<Usuari>(url, usuari, { headers });
  }

  crearUsuari(usuari: Usuari): Observable<Usuari> {
    const url = this.usuarisURL + 'crear'; 
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    return this.http.post<Usuari>(url, usuari, { headers });
  }

  eliminarUsuari(usuari: Usuari): Observable<string> {
    const url = `${this.usuarisURL}${usuari.nomUsuari}`;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    return this.http.delete(url, { headers, responseType: 'text' });
  }
}
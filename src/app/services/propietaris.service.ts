import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Propietari } from '../models/propietari.model';
import { environment } from '../environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PropietarisService {

  propietarisURL = environment.propietarisURL;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getPropietaris(): Observable<Propietari[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    return this.http.get<Propietari[]>(this.propietarisURL + 'llistat', { headers });
  }

  crearPropietari(propietari: Propietari): Observable<string> {
    const url = this.propietarisURL + 'crear';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    return this.http.post(url, propietari, { headers, responseType: 'text' });
  }

  actualitzarPropietari(email: string, propietari: Propietari): Observable<Propietari> {
    const url = this.propietarisURL + email;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    return this.http.put<Propietari>(url, propietari, { headers });
  }

  eliminarPropietari(propietari: Propietari): Observable<string> {
    const url = `${this.propietarisURL}${propietari.id}`;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    return this.http.delete(url, { headers, responseType: 'text' });
  }
}
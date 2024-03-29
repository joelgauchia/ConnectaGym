import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagament } from '../models/pagament.model';
import { environment } from '../environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PagamentsService {

  pagamentsURL = environment.pagamentsURL;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getPagaments(): Observable<Pagament[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    return this.http.get<Pagament[]>(this.pagamentsURL + 'llistat', { headers });
  }

  crearPagament(pagament: Pagament): Observable<string> {
    const url = this.pagamentsURL + 'crear';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    return this.http.post(url, pagament, { headers, responseType: 'text' });
  }

  actualitzarPagament(id: number, pagament: Pagament): Observable<Pagament> {
    const url = this.pagamentsURL + id;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    return this.http.put<Pagament>(url, pagament, { headers });
  }

  eliminarPagament(pagament: Pagament): Observable<string> {
    const url = `${this.pagamentsURL}${pagament.id}`;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    return this.http.delete(url, { headers, responseType: 'text' });
  }
}
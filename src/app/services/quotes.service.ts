import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quota } from '../models/quota.model';
import { environment } from '../environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  quotesURL = environment.quotesURL;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getQuotes(): Observable<Quota[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    return this.http.get<Quota[]>(this.quotesURL + 'llistat', { headers });
  }

  getQuotesCreadorActiu(): Observable<Quota[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    return this.http.get<Quota[]>(this.quotesURL + 'llistat-actiu', { headers });
  }

  getQuotesByGimnasNom(gimnasNom: string): Observable<Quota[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    const params = new HttpParams().set('nomGimnas', gimnasNom);
    return this.http.get<Quota[]>(this.quotesURL + 'perGimnas', { headers, params });
  }

  crearQuota(quota: Quota): Observable<string> {
    const url = this.quotesURL + 'crear';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    return this.http.post(url, quota, { headers, responseType: 'text' });
  }

  actualitzarQuota(id: number, quota: Quota): Observable<Quota> {
    const url = this.quotesURL + id;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    return this.http.put<Quota>(url, quota, { headers });
  }

  eliminarQuota(quota: Quota): Observable<string> {
    const url = `${this.quotesURL}${quota.id}`;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    return this.http.delete(url, { headers, responseType: 'text' });
  }
}
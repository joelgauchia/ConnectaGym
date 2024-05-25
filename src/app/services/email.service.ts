import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';
import { TokenService } from './token.service';
import { Missatge } from '../models/missatge.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private missatgesURL = environment.missatgesURL;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  enviarEmail(missatge: Missatge): Observable<string> {
    const url = this.missatgesURL + 'enviar';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
    return this.http.post(url, missatge, { headers, responseType: 'text' });
  }
}

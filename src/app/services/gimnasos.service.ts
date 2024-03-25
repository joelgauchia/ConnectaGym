import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { TokenService } from "./token.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Gimnas } from "../models/gimnas.model";

@Injectable({
    providedIn: 'root'
})
export class GimnasosService {

    gimnasosURL = environment.gimnasosURL;

    constructor(private http: HttpClient, private tokenService: TokenService) { }

    getGimnasos(): Observable<Gimnas[]> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        return this.http.get<Gimnas[]>(this.gimnasosURL + 'llistat', { headers });
    }

    crearGimnas(gimnas: Gimnas): Observable<string> {
        const url = this.gimnasosURL + 'crear';
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        return this.http.post(url, gimnas, { headers, responseType: 'text' });
    }

    actualitzarGimnas(id: number, gimnas: Gimnas): Observable<Gimnas> {
        const url = this.gimnasosURL + id;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        return this.http.put<Gimnas>(url, gimnas, { headers });
      }

    eliminarGimnas(gimnas: Gimnas): Observable<string> {
        const url = `${this.gimnasosURL}${gimnas.id}`;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        return this.http.delete(url, { headers, responseType: 'text' });
    }
}
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { TokenService } from "./token.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TipusLlicencia } from "../models/tipus-llicencia.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TipusLlicenciaService {

    tipusLlicenciaURL = environment.tipusLlicenciaURL;

    constructor(private http: HttpClient, private tokenService: TokenService) { }

    getTipusLlicencia(): Observable<TipusLlicencia[]> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        return this.http.get<TipusLlicencia[]>(this.tipusLlicenciaURL + 'llistat', { headers });
    }

    actualitzarTipusLlicencia(id: number, tipusLlicencia: TipusLlicencia): Observable<TipusLlicencia> {
        const url = this.tipusLlicenciaURL + id;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        return this.http.put<TipusLlicencia>(url, tipusLlicencia, { headers });
    }

    eliminarTipusLlicencia(tipusLlicencia: TipusLlicencia): Observable<string> {
        const url = `${this.tipusLlicenciaURL}${tipusLlicencia.id}`;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        return this.http.delete(url, { headers, responseType: 'text' });
    }
    
    crearTipusLlicencia(tipusLlicencia: TipusLlicencia): Observable<string> {
        const url = this.tipusLlicenciaURL + 'crear';
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        return this.http.post(url, tipusLlicencia, { headers, responseType: 'text' });
    }
}
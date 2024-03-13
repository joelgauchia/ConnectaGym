import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { TokenService } from "./token.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Llicencia } from "../models/llicencia.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LlicenciesService {

    llicenciesURL = environment.llicenciesURL;

    constructor(private http: HttpClient, private tokenService: TokenService) { }

    getLlicencies(): Observable<Llicencia[]> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        return this.http.get<Llicencia[]>(this.llicenciesURL + 'llistat', { headers });
    }

    setInactiva(llicencia: Llicencia): Observable<string> {
        const url = `${this.llicenciesURL}desactivar?id=${llicencia.id}`;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        return this.http.put(url, null, { headers, responseType: 'text' });
    }

    crearLlicencia(llicencia: Llicencia): Observable<string> {
        const url = this.llicenciesURL + 'crear';
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        return this.http.post(url, llicencia, { headers, responseType: 'text' });
    }

    eliminarLlicencia(llicencia: Llicencia): Observable<string> {
        const url = `${this.llicenciesURL}${llicencia.id}`;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        return this.http.delete(url, { headers, responseType: 'text' });
      }
}
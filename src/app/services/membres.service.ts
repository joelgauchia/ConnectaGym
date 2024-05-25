import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { TokenService } from "./token.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Membre } from "../models/membre.model";
import { Gimnas } from "../models/gimnas.model";

@Injectable({
    providedIn: 'root'
})
export class MembresService {

    membresURL = environment.membresURL;

    constructor(private http: HttpClient, private tokenService: TokenService) { }

    getMembres(): Observable<Membre[]> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        return this.http.get<Membre[]>(this.membresURL + 'llistat', { headers });
    }

    getMembresGimnas(gimnas: Gimnas): Observable<Membre[]> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        return this.http.get<Membre[]>(this.membresURL + 'llistat/' + gimnas.id, { headers });
    }

    getMembresCreadorActiu(): Observable<Membre[]> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        return this.http.get<Membre[]>(this.membresURL + 'llistat-actiu', { headers });
    }

    crearMembre(membre: Membre): Observable<string> {
        const url = this.membresURL + 'crear';
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        return this.http.post(url, membre, { headers, responseType: 'text' });
    }

    actualitzarMembre(id: number, membre: Membre): Observable<Membre> {
        const url = this.membresURL + id;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        return this.http.put<Membre>(url, membre, { headers });
    }

    eliminarMembre(membre: Membre): Observable<string> {
        const url = `${this.membresURL}${membre.id}`;
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        return this.http.delete(url, { headers, responseType: 'text' });
    }
}
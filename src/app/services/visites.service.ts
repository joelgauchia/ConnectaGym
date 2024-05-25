import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { TokenService } from "./token.service";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Visita } from "../models/visita.model";

@Injectable({
    providedIn: 'root'
})
export class VisitesService {

    visitesURL = environment.visitesURL;

    constructor(private http: HttpClient, private tokenService: TokenService) { }

    getVisites(): Observable<Visita[]> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        return this.http.get<Visita[]>(this.visitesURL + 'llistat', { headers });
    }

    getVisitesByGimnasNom(gimnasNom: string): Observable<Visita[]> {
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        const params = new HttpParams().set('nomGimnas', gimnasNom);
        return this.http.get<Visita[]>(this.visitesURL + 'perGimnas', { headers, params });
    }

    crearVisita(visita: Visita): Observable<string> {
        console.log(visita);
        const url = this.visitesURL + 'crear';
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getToken());
        return this.http.post(url, visita, { headers, responseType: 'text' });
    }
}
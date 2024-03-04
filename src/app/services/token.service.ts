import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    rols: Array<string> = [];

    constructor() { }

    public setToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken() {
        return sessionStorage.getItem(TOKEN_KEY);
    }

    public isLogged(): boolean {
        if (this.getToken()) {
          return true;
        }
        return false;
    }

    public getUsername() {
        if (!this.isLogged()) {
            return null;
        }
        const token = this.getToken();
        let payload = '';
        if (token !== null) {
            payload = token.split('.')[1];
        }
        console.log(payload);
        const payloadDecoded = atob(payload);
        console.log(payloadDecoded);
        const values = JSON.parse(payloadDecoded);
        console.log(values);
        const username = values.sub;
        return username;
    }

    public isGymAdmin(): boolean {
        if (!this.isLogged()) {
          return false;
        }
        const token = this.getToken();
        let payload = '';
        if (token !== null) {
            payload = token.split('.')[1];
        }
        console.log(payload);
        const payloadDecoded = atob(payload);
        console.log(payloadDecoded);
        const values = JSON.parse(payloadDecoded);
        console.log(values);
        const rols = values.rols;
        if (rols.indexOf('GYMADMIN') < 0) {
          return false;
        }
        return true;
    }

    public isSuperAdmin(): boolean {
        if (!this.isLogged()) {
          return false;
        }
        const token = this.getToken();
        let payload = '';
        if (token !== null) {
            payload = token.split('.')[1];
        }
        console.log(payload);
        const payloadDecoded = atob(payload);
        console.log(payloadDecoded);
        const values = JSON.parse(payloadDecoded);
        console.log(values);
        const rols = values.rols;
        if (rols.indexOf('SUPERADMIN') < 0) {
          return false;
        }
        return true;
    }

    public logOut(): void {
        window.sessionStorage.clear();
    }
}
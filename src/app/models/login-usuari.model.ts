export class LoginUsuari {
    nomUsuari: string;
    password: string;

    constructor(nomUsuari: string, password: string) { 
        this.nomUsuari = nomUsuari;
        this.password = password;
    }
}
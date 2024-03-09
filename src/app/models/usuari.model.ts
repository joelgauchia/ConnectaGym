export interface Usuari {
    nomUsuari: string;
    email: string;
    nom: string;
    actiu: boolean;
    dataCreacio: Date;
    dataModificacio: Date;
    rols: string[];
}
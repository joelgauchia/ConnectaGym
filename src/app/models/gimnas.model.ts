import { Propietari } from "./propietari.model";
import { Usuari } from "./usuari.model";

export interface Gimnas {
    id: number;
    nom: string;
    adreca: string;
    telefon: string;
    email: string;
    propietari: Propietari;
    creador: Usuari;
    dataCreacio: Date;
    dataModificacio: Date;
}
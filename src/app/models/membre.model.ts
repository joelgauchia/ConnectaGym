import { Gimnas } from "./gimnas.model";
import { Usuari } from "./usuari.model";

export interface Membre {
    id: number;
    nom: string;
    email: string;
    telefon: string;
    adreca: string;
    dataNaixement: string;
    estat: string;
    genere: string;
    observacions: string;
    gimnas: Gimnas;
    creador: Usuari;
    dataCreacio: Date;
    dataModificacio: Date;
}
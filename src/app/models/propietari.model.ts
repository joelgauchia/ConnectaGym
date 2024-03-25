import { Gimnas } from "./gimnas.model";
import { Usuari } from "./usuari.model";

export interface Propietari {
    id: number;
    nom: string;
    email: string;
    telefon: string;
    adreca: string;
    dataNaixement: Date;
    genere: string;
    tipus: string;
    creador: Usuari;
    dataCreacio: Date;
    dataModificacio: Date;
    gimnasos: Gimnas[];
}
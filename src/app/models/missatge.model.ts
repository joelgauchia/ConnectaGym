import { Membre } from "./membre.model";
import { Usuari } from "./usuari.model";

export interface Missatge {
    id?: number;
    membre: Membre;
    remitent: Usuari;
    titol: string;
    missatge: string;
    dataEnviament: Date;
}
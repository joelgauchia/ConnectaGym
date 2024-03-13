import { Usuari } from "./usuari.model";

export interface TipusLlicencia {
    id: number;
    nom: string;
    tipus: string;
    mesos: string;
    preu: number;
    creador: Usuari;
    dataCreacio: Date;
    dataModificacio: Date;
}
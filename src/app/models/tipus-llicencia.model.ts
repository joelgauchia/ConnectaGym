import { Usuari } from "./usuari.model";

export interface TipusLlicencia {
    id: number;
    nom: string;
    tipus: string;
    mesos: number;
    preu: number;
    creador: Usuari;
    dataCreacio: Date;
    dataModificacio: Date;
}
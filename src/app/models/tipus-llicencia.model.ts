import { Usuari } from "./usuari.model";

export interface TipusLlicencia {
    id: number;
    nom: string;
    durada: string;
    mesos: number;
    preu: number;
    tipus: string;
    creador: Usuari;
    dataCreacio: Date;
    dataModificacio: Date;
}
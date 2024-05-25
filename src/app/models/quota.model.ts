import { Gimnas } from "./gimnas.model";
import { Usuari } from "./usuari.model";

export interface Quota {
    id: number;
    nom: string;
    preu: number;
    tipus: string;
    mesos: number;
    gimnas: Gimnas;
    creador: Usuari;
    dataCreacio: Date;
    dataModificacio: Date;
}
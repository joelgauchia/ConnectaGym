import { Gimnas } from "./gimnas.model";
import { Membre } from "./membre.model";

export interface Visita {
    id?: number;
    membreGimnas?: Membre;
    gimnas: Gimnas;
    dataVisita: Date;
    abonat: boolean;
    preu?: number;
}
import { Gimnas } from "./gimnas.model";
import { Membre } from "./membre.model";
import { Quota } from "./quota.model";

export interface Pagament {
    id?: number;
    membre: Membre;
    quota: Quota;
    quantitat: number;
    dataInici: Date;
    dataFinal: Date;
    gimnas: Gimnas;
}
import { Propietari } from "./propietari.model";
import { TipusLlicencia } from "./tipus-llicencia.model";

export interface Llicencia {
    id: number;
    propietari: Propietari;
    tipusLlicencia: TipusLlicencia;
    preu: number;
    activa: boolean;
    dataInici: Date;
    dataVenciment: Date;
}
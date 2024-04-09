import { Gimnas } from "./gimnas.model";
import { Rol } from "./rol.model";

export interface Usuari {
    nomUsuari: string;
    email: string;
    nom: string;
    actiu: boolean;
    dataCreacio: Date;
    dataModificacio: Date;
    rols: Rol[];
    gimnasStaff: Gimnas;
}
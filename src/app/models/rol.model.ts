export class Rol {
    rolNom: RolNom;

    constructor(rolNom: RolNom) {
        this.rolNom = rolNom;
    }
}

export enum RolNom {
    STAFF = 'STAFF',
    GYMADMIN = 'GYMADMIN',
    SUPERADMIN = 'SUPERADMIN'
  }

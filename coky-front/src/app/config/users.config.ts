
export module UsersConfigModule {

    /**
     * The User Roles Constants thats enable roles to access to de 
     */
    export const USER_ROLES = [
        {
            id: 0, //Id del rol
            name: "root", //Nombre del rol
            visibleName: "Root", //Nombre visible del rol
            priority: 0, //Prioridad en procesos
            roleToUnlock: "root" //Quién puede desbloquearlo en caso que esté bloqueado
        },
        { id: 1, name: "admin", priority: 1, roleToUnlock: "root" },
        { id: 2, name: "general", priority: 2, roleToUnlock: "admin" },
    ]
    /**
     * User Status that enables users
     */
    export const USER_STATUS = [
        {
            id: 0, //Id del estado
            name: "inactive" //Nombre del estado
        },
        { id: 1, name: "ok" },
        { id: 2, name: "pass-blocked" },
        { id: 3, name: "banned" },
    ]

    /**
     * Returns role name
     * @param id role id
     */
    export function getRoleName(id): string {
        let found = null;
        USER_ROLES.forEach(role => {
            if (role.id == id) {
                found = role.name;
            }
        });
        if (!found) {
            throw new Error(`"${id}" no es un id de rol aceptado.`)
        }
        return found;
    }

    /**
     * Returns role id
     * @param name role name
     */
    export function getRoleId(name): number {
        let found = null;
        USER_ROLES.forEach(role => {
            if (role.name == name) {
                found = role.id;
            }
        });
        if (!found) {
            throw new Error(`"${name}" no es un nombre de rol aceptado.`)
        }
        return found;
    }

    /**
     * Returns status name
     * @param id status id
     */
    export function getStatusName(id): string {
        let found = null;
        USER_STATUS.forEach(status => {
            if (status.id == id) {
                found = status.name;
            }
        });
        if (!found) {
            throw new Error(`"${id}" no es un id de estado aceptado.`)
        }
        return found;
    }

    /**
     * Returns status id
     * @param name status name
     */
    export function getStatusId(name): number {
        let found = null;
        USER_STATUS.forEach(status => {
            if (status.name == name) {
                found = status.id;
            }
        });
        if (!found) {
            throw new Error(`"${name}" no es un nombre de estado aceptado.`)
        }
        return found;
    }
}

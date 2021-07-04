import { IColumn } from "../../models/enat.models";

export interface Role {
    id?: string,
    description?: string,
    name?: string,
    // users: Array<User>
}

export interface User {
    id?: any,
    username?: string,
    name?: string,
    lastName?: string,
    email?: string,
    roles?: Array<any>
}

export const USER_COLS: IColumn[] = [
    {
        label: "Id",
        name: 'id',
        width: 200
    },    
    {
        label: "Nombre",
        name: 'name',
        width: 250
    },
    {
        label: "Apellido",
        name: 'lastName',
        width: 250
    },
    {
        label: "Correo Electrónico",
        name: 'email',
        width: 300
    },
];
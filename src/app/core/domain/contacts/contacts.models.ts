import { IColumn } from "src/app/core/models/enat.models";


export interface Contact {
    id: any;
    name: string,
    position: string,
    email: string,
    telephoneNumber: string,
    ext: string,
    phoneNumber: string
}

export const CONTACTS_COLS: IColumn[] = [
    {
        label: "Id",
        name: 'id',
        width: 100
    },
    {
        label: "Nombre",
        name: 'name',
        width: 150
    },
    {
        label: "Posición",
        name: 'position',
        width: 150
    },
    {
        label: "Correo Electrónico",
        name: 'email',
        width: 250
    },
    {
        label: "Teléfono",
        name: 'telephoneNumber',
        width: 150
    },
    {
        label: "Extensión",
        name: 'ext',
        width: 100
    },
    {
        label: "Celular",
        name: 'phoneNumber',
        width: 150
    },
];
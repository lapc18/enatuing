import { IColumn } from "src/app/core/models/enat.models";


export interface Contact {
    id: any;
    Name: string,
    Position: string,
    Email: string,
    TelephoneNumber: string,
    Ext: string,
    PhoneNumber: string
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
        width: 200
    },
    {
        label: "Extensión",
        name: 'ext',
        width: 100
    },
    {
        label: "Celular",
        name: 'phoneNumber',
        width: 200
    },
];
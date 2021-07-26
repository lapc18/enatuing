import { IColumn } from "../../models/enat.models";


export const ASSIGNMENT_COLS: IColumn[] = [
    {
        label: "Id",
        name: 'id',
        width: 100
    },    
    {
        label: "Organismo",
        name: 'organization',
        width: 200
    },
    {
        label: "Contacto",
        name: 'contact',
        width: 250
    },
    {
        label: "NORTIC",
        name: 'nortic',
        width: 150
    },
    {
        label: "Tipo",
        name: 'type',
        width: 150
    },
    {
        label: "Estatus",
        name: 'status',
        width: 150
    },
];
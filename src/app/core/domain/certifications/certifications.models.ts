import { IColumn } from "src/app/core/models/enat.models";

export const CERTIFICATIONS_COLS: IColumn[] = [
    {
        label: "Id",
        name: 'id',
        width: 100
    },
    {
        label: "Organizacion",
        name: 'Organizacion',
        width: 200
    },
    {
        label: "NORTIC",
        name: 'description',
        width: 100
    },
    {
        label: "NIU",
        name: 'niu',
        width: 100
    },
    {
        label: "Tipo",
        name: 'type',
        width: 150
    },
    {
        label: "Estado",
        name: 'status',
        width: 150
    },
    
];
import { IColumn } from "src/app/core/models/enat.models";


export interface Organization {
    id: any;
    name: string,
    acronym: string,
    city: string,
}

export const ORGANIZATION_COLS: IColumn[] = [
    {
        label: "Id",
        name: 'id',
        width: 200
    },
    {
        label: "Nombre",
        name: 'name',
        width: 350
    },
    {
        label: "Siglas",
        name: 'acronym',
        width: 150
    },
    {
        label: "Ciudad",
        name: 'city',
        width: 200
    }
];
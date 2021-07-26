import { IColumn } from "src/app/core/models/enat.models";


export interface Certification {
    id?: any,
    organization?: string,
    nortic?: string,
    niu?: string,
    type?: string,
    status?: string
}

export const CERTIFICATIONS_COLS: IColumn[] = [
    {
        label: "Organizacion",
        name: 'organization',
        width: 200
    },
    {
        label: "NORTIC",
        name: 'nortic',
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
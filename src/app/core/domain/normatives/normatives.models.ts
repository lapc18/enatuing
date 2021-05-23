import { GenericTypeValue, IColumn } from "src/app/core/models/enat.models";


export interface Normative {
    id?: any,
    status?: string,
    publishedAt?: string,
    color?: string,
    description?: string
}

export const NORMATIVES_COLS: IColumn[] = [
    {
        label: "Id",
        name: 'id',
        width: 100
    },
    
    {
        label: "Año de publicación",
        name: 'publishedAt',
        width: 150
    },

    {
        label: "Descripción",
        name: 'description',
        width: 350
    },
    {
        label: "Color",
        name: 'color',
        width: 50,
        isColor: true,
    },
    {
        label: "Estado",
        name: 'status',
        width: 150
    },
    
];


export const NORMATIVE_STATUSES:GenericTypeValue[] = [
    {
        name: 'Activa',
        value: 'ACTIVA'
    },
    {
        name: 'Buenas Prácticas',
        value: 'BUENAS_PRACTICAS'
    },
    {
        name: 'Periodo de Prueba',
        value: 'PERIODO_PRUEBA'
    },
]
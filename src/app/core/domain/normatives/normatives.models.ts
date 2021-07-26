import { GenericTypeValue, IColumn } from "src/app/core/models/enat.models";


export interface Normative {
    id?: any,
    statusId?: string,
    status?: string | GenericTypeValue,
    publishetAt?: string,
    category?: string,
    order?: string,
    color?: string,
    description?: string
}

export const NORMATIVES_COLS: IColumn[] = [
    {
        label: "Año de publicación",
        name: 'publishetAt',
        width: 150
    },

    {
        label: "Descripción",
        name: 'description',
        width: 450
    },
    {
        label: "Categoria",
        name: 'category',
        width: 150
    },
    {
        label: "Orden",
        name: 'order',
        width: 150
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
        description: 'Activa',
        id: 'ACTIVA'
    },
    {
        description: 'Buenas Prácticas',
        id: 'BUENAS_PRACTICAS'
    },
    {
        description: 'Periodo de Prueba',
        id: 'PERIODO_PRUEBA'
    },
]
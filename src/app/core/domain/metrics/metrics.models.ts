import { IColumn } from "src/app/core/models/enat.models";


export interface Metric {
    id: any,
    policyName: string,
    timeInDays: string,
    status: number,
}

export const METRICS_COLS: IColumn[] = [
    {
        label: "Id",
        name: 'id',
        width: 100
    },
    {
        label: "Nombre de la Política",
        name: 'policyName',
        width: 350
    },
    {
        label: "Tiempo en días",
        name: 'timeInDays',
        width: 150
    },
    {
        label: "Estado",
        name: 'status',
        width: 250
    }
];
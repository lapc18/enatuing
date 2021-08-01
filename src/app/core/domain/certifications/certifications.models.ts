import { IColumn } from "src/app/core/models/enat.models";
import { Normative } from "../normatives/normatives.models";
import { Organization } from "../organizations/organizations.models";


export interface Certification {
    id?: any,
    organization?: string,
    nortic?: string,
    niu?: string,
    type?: string,
    status?: string,
    startDate?: string,
    endDate?: string,
}

export interface CertificationModel {
    id?: any,
    organizationId?: string,
    normativeId?: string,
    organization?: Organization,
    normative?: Normative,
    nortic?: string,
    niu?: string,
    type?: string,
    status?: string,
    startDate?: string,
    endDate?: string,
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
        label: "Fecha de certificación",
        name: 'startDate',
        width: 150
    },
    {
        label: "Fecha de caducidad",
        name: 'endDate',
        width: 150
    },
    {
        label: "Estado",
        name: 'status',
        width: 150
    },
    
];
import { IColumn } from "src/app/core/models/enat.models";
import { Certification } from "../certifications/certifications.models";
import { Contact } from "../contacts/contacts.models";
import { Metric } from "../metrics/metrics.models";
import { Normative } from "../normatives/normatives.models";
import { Organization } from "../organizations/organizations.models";
import { QueueUserAction } from "../queue-user/queue-user.model";
import { User } from "../users/users.models";

export interface QueueStatus {
    id?: any,
    description?: string,
    metricId?: string,
    metric?: Metric
}

export interface QueueModel {
    id?: any,
    status?: QueueStatus,
    contact?: Contact,
    organization?: Organization,
    normative?: Normative,
    startDate?: string,
    endDate?: string,
    type?: string,
    queueActions?: QueueUserAction[],
    isCertified?: boolean
}

export interface Queue {
    id?: any,
    organization?: string,
    contact?: string,
    nortic?: string,
    type?: string,
    auditor?: string,
    auditorId?: string,
    consultant?: string,
    consultantId?: string,
    status?: string,
    startDate?: string,
    endDate?: string,
    isCertified?: boolean
}

export const QUEUE_COLS: IColumn[] = [   
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
        label: "Consultor",
        name: 'consultant',
        width: 250
    },
    {
        label: "Auditor",
        name: 'auditor',
        width: 250
    },
    {
        label: "Estatus",
        name: 'status',
        width: 150
    },
    {
        label: "Fecha de Inicio",
        name: 'startDate',
        width: 150
    },
    {
        label: "Fecha de finalización",
        name: 'endDate',
        width: 150
    },
];
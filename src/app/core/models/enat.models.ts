import { TooltipPosition } from "@angular/material/tooltip";
import { Observable, Subscription } from "rxjs";
import { ASSIGNMENT_COLS } from "../domain/assigment/assignment.model";
import { CERTIFICATIONS_COLS } from "../domain/certifications/certifications.models";
import { CONTACTS_COLS } from "../domain/contacts/contacts.models";
import { NORMATIVES_COLS } from "../domain/normatives/normatives.models";
import { ORGANIZATION_COLS } from "../domain/organizations/organizations.models";
import { QUEUE_COLS } from "../domain/queue/queue.models";
import { USER_COLS } from "../domain/users/users.models";

export class DrawerItem {
    constructor(
        public icon?: string,
        public label?: string,
        public toolTip?: string,
        public toolTipPosition?: TooltipPosition,
        public route: string = 'javascript:void(0)',
        public isLink: boolean = false,
        public isEnabled: boolean = true,
        public allowedRoles: string[] = [],
        public nodes:DrawerItem[] = []
    ) { }

}

export const DRAWER_OPTIONS = (userId: string): DrawerItem[] => [
    new DrawerItem(
        'dashboard',
        'Dashboard',
        'Dashboard',
        'left',
        '/dashboard/home',
        false,
        true,
        ['admin', 'audit', 'consult']
    ),
    new DrawerItem(
        'receipt_long',
        'Matríz',
        'Matríz',
        'left',
        '/dashboard/queue',
        false,
        true,
        ['admin', 'audit', 'consult', 'manager', 'supervisor'],
        [
            new DrawerItem(
                'list',
                'Matríz general',
                'Matríz general con todas las solicitudes en proceso de certificación',
                'left',
                '/dashboard/queue/current',
                false,
                true,
                ['admin', 'audit', 'consult', 'manager', 'supervisor'],
            ),
            new DrawerItem(
                'hourglass_bottom',
                'Matríz de procesos activos',
                'Matríz general con todas las solicitudes en proceso de certificación',
                'left',
                '/dashboard/queue/current/inprocess',
                false,
                true,
                ['admin', 'audit', 'consult', 'manager', 'supervisor'],
            ),
            new DrawerItem(
                'task',
                'Matríz de procesos finalizados',
                'Matríz general con todas las solicitudes en proceso de certificación',
                'left',
                '/dashboard/queue/current/done',
                false,
                true,
                ['admin', 'audit', 'consult', 'manager', 'supervisor'],
            ),
            new DrawerItem(
                'assignment_ind',
                'Matríz de usuario',
                'Matríz exclusiva del usuario actual',
                'left',
                '/dashboard/queue/user/' + userId,
                false,
                true,
                ['admin', 'audit', 'consult']
            ),
        ]
    ),
    new DrawerItem(
        'card_membership',
        'Normativas',
        'Normativas',
        'left',
        '/dashboard/normatives',
        false,
        true,
        ['admin', 'audit', 'consult', 'manager', 'supervisor'],
    ),
    new DrawerItem(
        'verified_user',
        'Certificaciones',
        'Certificaciones',
        'left',
        '/dashboard/certifications',
        false,
        true,
        ['admin', 'audit', 'consult', 'manager', 'supervisor'],
        [
            new DrawerItem(
                'check_circle',
                'Activas',
                'Certificaciones activas',
                'left',
                '/dashboard/certifications/1',
                false,
                true,
                ['admin', 'audit', 'consult', 'manager', 'supervisor', 'visitor'],
            ),
            new DrawerItem(
                'unpublished',
                'Inactivas',
                'Certificaciones activas',
                'left',
                '/dashboard/certifications/0',
                false,
                true,
                ['admin', 'audit', 'consult', 'manager', 'supervisor', 'visitor'],
            ),
            new DrawerItem(
                'today',
                'Emitidas esta semana',
                'Certificaciones emitidas durante el transcurso de la semana en curso',
                'left',
                '/dashboard/certifications/week',
                false,
                true,
                ['admin', 'audit', 'consult', 'manager', 'supervisor', 'visitor'],
            ),
            new DrawerItem(
                'date_range',
                'Emitidas este mes',
                'Certificaciones emitidas durante el transcurso del mes en curso',
                'left',
                '/dashboard/certifications/month',
                false,
                true,
                ['admin', 'audit', 'consult', 'manager', 'supervisor', 'visitor'],
            ),
        ]
    ),
    new DrawerItem(
        'corporate_fare',
        'Organizaciones',
        'Organizaciones',
        'left',
        '/dashboard/organizations',
        false,
        true,
        ['admin', 'audit', 'consult', 'manager', 'supervisor'],
    ),
    new DrawerItem(
        'contacts',
        'Contactos',
        'Contactos',
        'left',
        '/dashboard/contacts',
        false,
        true,
        ['admin', 'audit', 'consult', 'manager', 'supervisor'],
    ),
    new DrawerItem(
        'insights',
        'Métricas',
        'Métricas',
        'left',
        '/dashboard/metrics',
        false,
        true,
        ['admin', 'manager'],
    ),
    new DrawerItem(
        'people',
        'Usuarios',
        'Usuarios',
        'left',
        '/dashboard/users',
        false,
        true,
        ['admin', 'audit', 'manager', 'supervisor'],
    ),
    new DrawerItem(
        'analytics',
        'Estadísticas',
        'Estadísticas generales del sistema',
        'left',
        '/dashboard/statistics',
        false,
        false,
        ['admin', 'audit', 'consult', 'manager', 'supervisor', 'visitor'],
    )
];


export interface IColumn {
    name: string,
    label: string,
    width?: number,
    color?: string,
    isSortable?: boolean,
    isColor?: boolean
}

export interface GenericTypeValue {
    description: string,
    id?: string  | number,
}


export interface IColumnSettings {
    contacts: IColumn[],
    certifications: IColumn[],
    organizations: IColumn[],
    normatives: IColumn[],
    queue: IColumn[],
    user: IColumn[],
    assignment: IColumn[],
}

export const columnSettings: IColumnSettings = {
    contacts: CONTACTS_COLS,
    certifications: CERTIFICATIONS_COLS,
    organizations: ORGANIZATION_COLS,
    normatives: NORMATIVES_COLS,
    queue: QUEUE_COLS,
    user: USER_COLS,
    assignment: ASSIGNMENT_COLS
}

export interface FileHandler {
    contentType: string;
    fileExtension: string;
    export: (data: any, fileName: string) => void;
}

export enum FileType {
    excel = 'excel',
    htmlPng = 'png'
}

export enum CardTemplate {
    goal = 'goal',
    statistic = 'statistic'
}

export interface IBaseService<T> {
    addSubscription(subscription: Subscription): void;
    unsubscribe(): void;
    search(params?: any): Observable<T[]>;
    softDelete(id?: string): Observable<any>;
    save(item?: T): Observable<any>;
}

export const GLOBAL_STATUS: GenericTypeValue[] = [
    {
        id: 1,
        description: 'Activo'
    },
    {
        id: 0,
        description: 'Inactivo'
    },
];

export interface NorticStamp {
    niu: string,
    color: string,
    year: string,
    nortic: string,
    startDate?: string,
    endDate?: string,
    consultant?: string,
    auditor?: string,
}

export const GLOBAL_NORTIC_CATEGORIES: GenericTypeValue[] = [
    {
        id: 0,
        description: 'A'
    },
    {
        id: 1,
        description: 'B'
    },
    {
        id: 2,
        description: 'C'
    },
    {
        id: 3,
        description: 'D'
    },
    {
        id: 4,
        description: 'E'
    },
];

export interface City {
    capital: string,
    name: string
}
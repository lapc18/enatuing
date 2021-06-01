import { TooltipPosition } from "@angular/material/tooltip";
import { Observable, Subscription } from "rxjs";
import { CERTIFICATIONS_COLS } from "../domain/certifications/certifications.models";
import { CONTACTS_COLS } from "../domain/contacts/contacts.models";
import { NORMATIVES_COLS } from "../domain/normatives/normatives.models";
import { ORGANIZATION_COLS } from "../domain/organizations/organizations.models";

export class DrawerItem {
    constructor(
        public label?: string,
        public toolTip?: string,
        public toolTipPosition?: TooltipPosition,
        public route: string = 'javascript:void(0)',
        public isLink: boolean = false,
        public isEnabled: boolean = true,
    ) { }

}

export const DRAWER_OPTIONS: DrawerItem[] = [
    new DrawerItem(
        'Dashboard',
        'Dashboard',
        'left',
        '/dashboard/home',
        false,
        true
    ),
    new DrawerItem(
        'Matríz',
        'Matríz',
        'left',
        '/dashboard/queue',
        false,
        true
    ),
    new DrawerItem(
        'Normativas',
        'Normativas',
        'left',
        '/dashboard/normatives',
        false,
        true
    ),
    new DrawerItem(
        'Certificaciones',
        'Certificaciones',
        'left',
        '/dashboard/certifications',
        false,
        true
    ),
    new DrawerItem(
        'Organizaciones',
        'Organizaciones',
        'left',
        '/dashboard/organizations',
        false,
        true
    ),
    new DrawerItem(
        'Contactos',
        'Contactos',
        'left',
        '/dashboard/contacts',
        false,
        true
    ),
    new DrawerItem(
        'Métricas',
        'Métricas',
        'left',
        '/dashboard/metrics',
        false,
        true
    ),
    new DrawerItem(
        'Usuarios',
        'Usuarios',
        'left',
        '/dashboard/users',
        false,
        true
    ),
    new DrawerItem(
        'Statistics',
        'Statistics',
        'left',
        '/dashboard/statistics',
        false,
        false
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
    normatives: IColumn[]
}

export const columnSettings: IColumnSettings = {
    contacts: CONTACTS_COLS,
    certifications: CERTIFICATIONS_COLS,
    organizations: ORGANIZATION_COLS,
    normatives: NORMATIVES_COLS,
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

export const CERTIFICATION_STATUS: GenericTypeValue[] = [
    {
        id: 0,
        description: 'Activo'
    },
    {
        id: 1,
        description: 'Inactivo'
    },
]
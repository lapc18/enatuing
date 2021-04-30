import { CERTIFICATIONS_COLS } from "../domain/certifications/certifications.models";
import { CONTACTS_COLS } from "../domain/contacts/contacts.models";
import { ORGANIZATION_COLS } from "../domain/organizations/organizations.models";

export class DrawerItem {
    constructor(
        public label?: string,
        public toolTip?: string,
        public toolTipPosition?: string,
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
    isSortable?: boolean
}

export interface GenericTypeValue {
    name: string,
    value: string
}


export interface IColumnSettings {
    contacts: IColumn[],
    certifications: IColumn[],
    organizations: IColumn[]
}

export const columnSettings: IColumnSettings = {
    contacts: CONTACTS_COLS,
    certifications: CERTIFICATIONS_COLS,
    organizations: ORGANIZATION_COLS
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
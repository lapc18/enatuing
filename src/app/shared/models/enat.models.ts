export class DrawerItem {
    constructor(
        public label?: string,
        public toolTip?: string,
        public toolTipPosition?: string,
        public route: string = 'javascript:void(0)',
        public isLink: boolean = false,
        public isEnabled: boolean = true,
    ){}

}


export const DRAWER_OPTIONS:DrawerItem[] = [
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
    )
];
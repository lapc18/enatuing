export interface IServiceOptions {
    endpoint?: string
    summaryList?: string,
}

export interface BaseServiceOptions {
    certifications?: IServiceOptions,
    dashboard?: IServiceOptions,
    contacts?: IServiceOptions,
    home?: IServiceOptions,
    metrics?: IServiceOptions,
    normatives?: IServiceOptions,
    organization?: IServiceOptions,
    queue?: IServiceOptions,
    statistics?: IServiceOptions,
    users?: IServiceOptions,
}


const certificationsServiceOptions:IServiceOptions = {
    endpoint: '/api/Certifications',
}

const dashboardServiceOptions:IServiceOptions = {
    endpoint: '',
}

const contactServiceOptions:IServiceOptions = {
    endpoint: '/optic/enat/api/Contacts',
}

const normativeServiceOptions:IServiceOptions = {    
    endpoint: '/optic/enat/api/Normatives'
}

const organizationServiceOptions:IServiceOptions = {
    endpoint: '/optic/enat/api/Organization'
}

const queueServiceOptions:IServiceOptions = {
    endpoint: '/optic/enat/api/Queue'
}


export const baseServiceOptions: BaseServiceOptions = {
    certifications: certificationsServiceOptions,
    dashboard: dashboardServiceOptions,
    contacts: contactServiceOptions,
    normatives: normativeServiceOptions,
    organization: organizationServiceOptions,
    queue: queueServiceOptions
}
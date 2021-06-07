export class QueueEntity {

    public id?: any;
    public statusId?: string;
    public contactId?: string;
    public organizationId?: string;
    public normativeId?: string;
    public consultantId?: string;
    public auditorId?: string;

    constructor(public init?:Partial<QueueEntity>) {
        Object.assign(this, init);
    }
}

export class QueueStatusEntity {

    public id?: any;
    public metricId?: string;
    public description?: string;

    constructor(public init?:Partial<QueueEntity>) {
        Object.assign(this, init);
    }
}
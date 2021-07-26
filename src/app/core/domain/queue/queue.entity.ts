export class QueueEntity {

    public id?: any;
    public statusId?: string;
    public contactId?: string;
    public organizationId?: string;
    public normativeId?: string;
    public consultantId?: string;
    public auditorId?: string;
    public startDate?: string;
    public endDate?: string;

    constructor(public init?:Partial<QueueEntity>) {
        Object.assign(this, init);
    }

    copyOf(): {
        id?: string,
        statusId?: string,
        contactId?: string,
        organizationId?: string,
        consultantId?: string,
        auditorId?: string,
    } {
        return {
            id: this.id,
            statusId: this.statusId,
            contactId: this.contactId,
            organizationId: this.organizationId,
            consultantId: this.consultantId,
            auditorId: this.auditorId,
        };
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
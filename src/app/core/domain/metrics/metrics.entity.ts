
export class MetricsEntity {

    public id?: any;
    public policyName?: string;
    public timeInDays?: string;
    public status?: number;

    constructor(public init?:Partial<MetricsEntity>) {
        Object.assign(this, init);
    }
}

export class CertificationEntity {
    public id?: any;
    public organization?: string;
    public nortic?: string;
    public niu?: string;
    public type?: string;
    public status?: string;

    constructor(public init: Partial<CertificationEntity>){
        Object.assign(this, init);
    }
}

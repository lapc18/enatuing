export class OrganizationEntity {
    public id?: any;
    public name?: string;
    public acronym?: string;
    public city?: string;
    constructor(public init?:Partial<OrganizationEntity>) { 
        Object.assign(this, init);
    }
}
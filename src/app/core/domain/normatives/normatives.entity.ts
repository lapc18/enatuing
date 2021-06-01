export class NormativeEntity {
    public id?: any;
    public statusId?: string;
    public publishetAt?: string;
    public color?: string;
    public description?: string
    constructor(public init:Partial<NormativeEntity>) { 
        Object.assign(this, init);
    }
}
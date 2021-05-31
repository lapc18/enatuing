export class ContactsEntity {
    public name: string;
    public position: string;
    public email: string;
    public telephoneNumber: string;
    public ext?: string;
    public phoneNumber?: string;
    public id?: any;
    constructor(public init:Partial<ContactsEntity>) { 
        Object.assign(this, init);
    }
}

export class RoleEntity {
    public name: string;
    public description: string;
    public id?: any;
    public users?: Array<UserEntity>;
    constructor(public init:Partial<RoleEntity>) { 
        Object.assign(this, init);
    }
}

export class UserEntity {
    public name: string;
    public lastName: string;
    public email: string;
    public id?: any;
    public roles?: Array<RoleEntity>;
    constructor(public init:Partial<UserEntity>) { 
        Object.assign(this, init);
    }
}
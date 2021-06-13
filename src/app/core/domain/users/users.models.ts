export interface Role {
    id?: string,
    description?: string,
    users: Array<User>
}

export interface User {
    id?: any,
    username?: string,
    name?: string,
    lastName?: string,
    email?: string,
    roles?: Array<Role>
}


export interface QueueAction {
    id?: string,
    name?: string,
    description?: string
}

export interface QueueUserAction {
    queueId?: string,
    queueActionID?: string,
    userId?: string 
}
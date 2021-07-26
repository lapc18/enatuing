

export interface QueueAction {
    id?: string | number,
    name?: string,
    description?: string
}

export interface QueueUserAction {
    queueId?: string,
    queueActionId?: string,
    user?: any,
    queueAction?: QueueAction,
}
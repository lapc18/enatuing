import { createAction, props } from "@ngrx/store";
import { QueueModel, QueueStatus } from "../../domain/queue/queue.models";


//Queue actions
export const loadQueue = createAction('[Queue Module] Loading Queue');
export const loadQueueSuccess = createAction('[Queue Module] Queue Loaded Successfully', props<{ payload: QueueModel[] }>());
export const loadQueueFailed = createAction('[Queue Module] Queue Loaded Failed', props<{ payload: string }>());
export const createQueue = createAction('[Queue Module] Creating Queue', props<{ payload: QueueModel }>());
export const createQueueFailed = createAction('[Queue Module] Creating Queue Failed', props<{ payload: string }>());
export const editQueue = createAction('[Queue Module] Editing Queue', props<{ payload: any, id: string | number}>());
export const editQueueFailed = createAction('[Queue Module] Editing Queue Failed', props<{ payload: string }>());
export const removeQueue = createAction('[Queue Module] Removing Queue', props<{ id: string | number }>());
export const removeQueueFailed = createAction('[Queue Module] Removing Queue Failed', props<{ payload: string }>());
export const onSuccess = createAction('[Action Status] Action excuted Successfully');


export const loadQueueStatuses = createAction('[Queue Module] Loading Queue Statuses');
export const loadQueueStatusesSuccess = createAction('[Queue Module] Queue Statuses Loaded Successfully', props<{ payload: QueueStatus[] }>());
export const loadQueueStatusesFailed = createAction('[Queue Module] Queue Statuses Load Failed', props<{ payload: string }>());

import { createAction, props } from "@ngrx/store";
import { QueueAction, QueueUserAction } from "../../domain/queue-user/queue-user.model";


//Queue User actions
export const loadQueueActions = createAction('[Queue User] Loading Queue User');
export const loadQueueActionsSuccess = createAction('[Queue User] Queue Actions Loaded Successfully', props<{ payload: QueueAction[] }>());
export const loadQueueActionsFailed = createAction('[Queue User] Queue Actions Load Failed', props<{ payload: string }>());
export const createQueueAction = createAction('[Queue User] Creating Queue Action', props<{ payload: QueueAction }>());
export const createQueueActionFailed = createAction('[Queue User] Creating Queue Action Failed', props<{ payload: string }>());
export const editQueueAction = createAction('[Queue User] Editing Queue User Action', props<{ payload: any, id: string | number}>());
export const editQueueActionFailed = createAction('[Queue User] Editing Queue Action Failed', props<{ payload: string }>());
export const onSuccess = createAction('[Action Status] Action excuted Successfully');


export const loadQueueUserAction = createAction('[Queue User] Loading Queue User Statuses');
export const loadQueueUserActionSuccess = createAction('[Queue User] Queue User Statuses Loaded Successfully', props<{ payload: QueueUserAction[] }>());
export const loadQueueUserActionFailed = createAction('[Queue User] Queue User Statuses Load Failed', props<{ payload: string }>());

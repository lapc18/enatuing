import { Action, createReducer, on } from "@ngrx/store";
import { QueueModel, QueueStatus } from "../../domain/queue/queue.models";
import { CommonState } from "../../models/common-state.model";
import * as actions from './queue-user.actions';


export interface QueueActionState extends CommonState {
    queueActions: Array<QueueModel>,
    queueUserActions: Array<QueueStatus>
}

const initialQueuetate: QueueActionState = {
    queueActions: [],
    queueUserActions: [],
    isLoading: false,
    hasError: false,
    errorMessage: '',
}

const reducer = createReducer(
    initialQueuetate,

    on(actions.onSuccess, (state) => ({ ...state, isLoading: false })),

    on(actions.loadQueueActions, (state) => ({ ...state, isLoading: true })),
    on(actions.loadQueueActionsSuccess, (state, { payload }) => ({ ...state, isLoading: false, queueActions: [...payload] })),
    on(actions.loadQueueActionsFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.loadQueueUserAction, (state) => ({ ...state, isLoading: true })),
    on(actions.loadQueueActionsSuccess, (state, { payload }) => ({ ...state, isLoading: false, queueUserActions: [...payload] })),
    on(actions.loadQueueActionsFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.createQueueAction, (state, { payload }) => ({
        ...state,
        isLoading: true,
        queueActions: [...state.queueActions,  payload],
    })),
    
    on(actions.createQueueActionFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.editQueueAction, (state, { payload, id }) => ({
        ...state,
        isLoading: true,
        queueActions: [...state.queueActions.map((item) => {
            if(item.id == id){
                let object:QueueModel = {...payload};
                object.id = id;
                return object;
            }
            return {...item};
        })]
    })),
    on(actions.editQueueActionFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

);


export function queueActionReducer(state: QueueActionState | undefined, action: Action) {
    return reducer(state, action);
}
import { Action, createReducer, on } from "@ngrx/store";
import { QueueModel, QueueStatus } from "../../domain/queue/queue.models";
import { CommonState } from "../../models/common-state.model";
import { GenericTypeValue } from "../../models/enat.models";
import * as actions from './queue.actions';


export interface QueueState extends CommonState {
    queue: Array<QueueModel>,
    queueStatuses: Array<QueueStatus>,
    isLoadingQueueStatuses: boolean
}

const initialQueuetate: QueueState = {
    queue: [],
    queueStatuses: [],
    isLoading: false,
    isLoadingQueueStatuses: false,
    hasError: false,
    errorMessage: '',
}

const reducer = createReducer(
    initialQueuetate,

    on(actions.onSuccess, (state) => ({ ...state, isLoading: false })),

    on(actions.loadQueue, (state) => ({ ...state, isLoading: true })),
    on(actions.loadQueueSuccess, (state, { payload }) => ({ ...state, isLoading: false, queue: [...payload] })),
    on(actions.loadQueueFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.loadQueueStatuses, (state) => ({ ...state, isLoadingQueueStatuses: true })),
    on(actions.loadQueueStatusesSuccess, (state, { payload }) => ({ ...state, isLoadingQueueStatuses: false, queueStatuses: [...payload] })),
    on(actions.loadQueueStatusesFailed, (state, { payload }) => ({ ...state, isLoadingQueueStatuses: false, hasError: true, errorMessage: payload })),

    on(actions.createQueue, (state, { payload }) => ({
        ...state,
        isLoading: true,
        queue: [...state.queue,  payload],
    })),
    
    on(actions.createQueueFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.editQueue, (state, { payload, id }) => ({
        ...state,
        isLoading: true,
        queue: [...state.queue.map((contact) => {
            if(contact.id == id){
                let object:QueueModel = {...payload};
                object.id = id;
                return object;
            }
            return {...contact};
        })]
    })),
    on(actions.editQueueFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.removeQueue, (state, { id }) => ({
        ...state,
        isLoading: true,
        queue: [...state.queue.filter(contact => contact.id !== id)],
    })),
    on(actions.removeQueueFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),
);


export function queueReducer(state: QueueState | undefined, action: Action) {
    return reducer(state, action);
}
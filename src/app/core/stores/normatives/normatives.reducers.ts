import { Action, createReducer, on } from "@ngrx/store";
import { Normative } from "../../domain/normatives/normatives.models";
import { CommonState } from "../../models/common-state.model";
import * as actions from './normatives.actions';


export interface NormativesState extends CommonState {
    normatives: Array<Normative>,
}

const initialNormativestate: NormativesState = {
    normatives: [],
    isLoading: false,
    hasError: false,
    errorMessage: '',
}

const reducer = createReducer(
    initialNormativestate,

    on(actions.onSuccess, (state) => ({ ...state, isLoading: false })),

    on(actions.loadNormatives, (state) => ({ ...state, isLoading: true })),
    on(actions.loadNormativesSuccess, (state, { payload }) => ({ ...state, isLoading: false, normatives: [...payload] })),
    on(actions.loadNormativesFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.createNormatives, (state, { payload }) => ({
        ...state,
        isLoading: true,
        normatives: [...state.normatives,  payload],
    })),
    
    on(actions.createNormativesFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.editNormatives, (state, { payload, id }) => ({
        ...state,
        isLoading: true,
        normatives: [...state.normatives.map((contact) => {
            if(contact.id == id){
                let object:Normative = {...payload};
                object.id = id;
                return object;
            }
            return {...contact};
        })]
    })),
    on(actions.editNormativesFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.removeNormatives, (state, { payload, id }) => ({
        ...state,
        isLoading: true,
        normatives: [...state.normatives.filter(contact => contact.id !== id)],
    })),
    on(actions.removeNormativesFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),
);


export function normativesReducer(state: NormativesState | undefined, action: Action) {
    return reducer(state, action);
}
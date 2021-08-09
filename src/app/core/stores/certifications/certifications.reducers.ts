import { Action, createReducer, on } from "@ngrx/store";
import { Certification, CertificationModel } from "../../domain/certifications/certifications.models";
import { CommonState } from "../../models/common-state.model";
import * as actions from './certifications.actions';


export interface Certificationstate extends CommonState {
    certifications: Array<CertificationModel>,
    lastCertificationCreated: CertificationModel
}

const initialCertificationstate: Certificationstate = {
    certifications: [],
    lastCertificationCreated: {},
    isLoading: false,
    hasError: false,
    errorMessage: '',
}

const reducer = createReducer(
    initialCertificationstate,

    on(actions.onSuccess, (state) => ({ ...state, isLoading: false })),

    on(actions.loadCertifications, (state) => ({ ...state, isLoading: true })),
    on(actions.loadCertificationsSuccess, (state, { payload }) => ({ ...state, isLoading: false, certifications: [...payload] })),
    on(actions.loadCertificationsFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.createCertifications, (state, { payload }) => ({
        ...state,
        isLoading: true,
        certifications: [...state.certifications,  payload],
    })),

    on(actions.onCertificationCreated, (state, { payload }) => ({ ...state, isLoading: true, lastCertificationCreated: {...payload}})),
    
    on(actions.createCertificationsFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.editCertifications, (state, { payload, id }) => ({
        ...state,
        isLoading: true,
        certifications: [...state.certifications.map((contact) => {
            if(contact.id == id){
                let object:CertificationModel = {...payload};
                object.id = id;
                return object;
            }
            return {...contact};
        })]
    })),
    on(actions.editCertificationsFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.removeCertifications, (state, { payload }) => ({
        ...state,
        isLoading: true,
        certifications: [...state.certifications.filter(contact => contact.id !== payload)],
    })),
    on(actions.removeCertificationsFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),
);


export function certificationReducer(state: Certificationstate | undefined, action: Action) {
    return reducer(state, action);
}
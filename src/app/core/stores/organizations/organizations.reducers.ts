import { Action, createReducer, on } from "@ngrx/store";
import { Organization } from "../../domain/organizations/organizations.models";
import { CommonState } from "../../models/common-state.model";
import { City } from "../../models/enat.models";
import * as actions from './organizations.actions';


export interface OrganizationState extends CommonState {
    organizations: Array<Organization>,
    cities: City[]
}

const initialOrganizationState: OrganizationState = {
    organizations: [],
    cities:[],
    isLoading: false,
    hasError: false,
    errorMessage: '',
}

const reducer = createReducer(
    initialOrganizationState,

    on(actions.onSuccess, (state) => ({ ...state, isLoading: false })),

    on(actions.loadOrganizations, (state) => ({ ...state, isLoading: true })),
    on(actions.loadOrganizationsSuccess, (state, { payload }) => ({ ...state, isLoading: false, organizations: [...payload] })),
    on(actions.loadOrganizationsFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.createOrganizations, (state, { payload }) => ({
        ...state,
        isLoading: true,
        organizations: [...state.organizations,  payload],
    })),
    
    on(actions.createOrganizationsFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.editOrganizations, (state, { payload, id }) => ({
        ...state,
        isLoading: true,
        organizations: [...state.organizations.map((contact) => {
            if(contact.id == id){
                let object:Organization = {...payload};
                object.id = id;
                return object;
            }
            return {...contact};
        })]
    })),
    on(actions.editOrganizationsFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.removeOrganizations, (state, { payload, id }) => ({
        ...state,
        isLoading: true,
        organizations: [...state.organizations.filter(contact => contact.id !== id)],
    })),
    on(actions.removeOrganizationsFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.loadCities, (state) => ({ ...state, isLoading: true })),
    on(actions.loadCitiesSuccess, (state, { payload }) => ({ ...state, isLoading: false, cities: [...payload] })),
);


export function organizationReducer(state: OrganizationState | undefined, action: Action) {
    return reducer(state, action);
}
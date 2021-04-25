import { Action, createReducer, on } from "@ngrx/store";
import { Contact } from "../../domain/contacts/contacts.models";
import { CommonState } from "../../models/common-state.model";
import * as actions from './contacts.actions';


export interface ContactState extends CommonState {
    contacts: Contact[],
}

const initialContactState: ContactState = {
    contacts: [],
    isLoading: false,
    hasError: false,
    errorMessage: '',
}

const reducer = createReducer(
    initialContactState,
    on(actions.loadContacts, (state) => ({ ...state, isLoading: true })),
    on(actions.loadContactsSuccess, (state, { payload }) => ({ ...state, isLoading: false, contacts: payload })),
    on(actions.loadContactsFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.createContacts, (state, { payload }) => ({
        ...state,
        isLoading: true,
        contacts: [...state.contacts,  payload],
    })),
    on(actions.createContactsuccess, (state) => ({ ...state, isLoading: false })),
    on(actions.createContactsFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.editContacts, (state, { payload, id }) => ({
        ...state,
        isLoading: true,
        contacts: state.contacts.map((contact) => {
            if(contact.id == id){
                payload.id = id;
                return payload;
            }
            return contact;
        })
    })),
    on(actions.editContactsuccess, (state) => ({ ...state, isLoading: false })),
    on(actions.editContactsFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.removeContacts, (state, { payload, id }) => ({
        ...state,
        isLoading: true,
        contacts: state.contacts.filter(contact => contact.id !== id),
    })),
    on(actions.removeContactsuccess, (state) => ({ ...state, isLoading: false })),
    on(actions.removeContactsFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),
);


export function contactReducer(state: ContactState | undefined, action: Action) {
    return reducer(state, action);
}
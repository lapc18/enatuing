import { Action, createReducer, on } from "@ngrx/store";
import { Certification } from "../../domain/certifications/certifications.models";
import { User } from "../../domain/users/users.models";
import { CommonState } from "../../models/common-state.model";
import * as actions from './auth.actions';


export interface AuthState extends CommonState {
    currentUser: User,
    users: User[],
    tkn: string
}

const initialAuthState: AuthState = {
    currentUser: {},
    users: [],
    tkn: '',
    isLoading: false,
    hasError: false,
    errorMessage: '',
}

const reducer = createReducer(
    initialAuthState,

    on(actions.onLoginSuccess, (state, { payload, tkn }) => ({ ...state, currentUser: {...payload}, tkn: tkn, isLoading: false })),

    on(actions.onLogin, (state, { payload }) => ({
        ...state,
        isLoading: true,
    })),

    on(actions.onLoginFails, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.onRemoveUserSuccess, (state, { payload }) => ({ ...state, isLoading: false, hasError: payload })),

    on(actions.onRemoveUser, (state, { payload }) => ({
        ...state,
        isLoading: true,
    })),

    on(actions.onRemoveUserFails, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.loadUsers, (state) => ({ ...state, isLoading: true })),
    on(actions.loadUsersSuccess, (state, { payload }) => ({ ...state, isLoading: false, users: [...payload] })),
    on(actions.loadUsersFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),
);


export function AuthReducer(state: AuthState | undefined, action: Action) {
    return reducer(state, action);
}
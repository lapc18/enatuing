import { Action, createReducer, on } from "@ngrx/store";
import { Role, User } from "../../domain/users/users.models";
import { CommonState } from "../../models/common-state.model";
import * as actions from './users.actions';


export interface UserState extends CommonState {
    users: Array<User>,
    roles: Array<Role>,
    selectedUser?: User
}

const initialUserState: UserState = {
    users: [],
    roles: [],
    selectedUser: undefined,
    isLoading: false,
    hasError: false,
    errorMessage: '',
}

const reducer = createReducer(
    initialUserState,

    on(actions.onSuccess, (state) => ({ ...state, isLoading: false })),

    on(actions.loadUsers, (state) => ({ ...state, isLoading: true })),
    on(actions.loadUsersSuccess, (state, { payload }) => ({ ...state, isLoading: false, users: [...payload] })),
    on(actions.loadUsersFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.loadUser, (state) => ({ ...state, isLoading: true })),
    on(actions.loadUserSuccess, (state, { payload }) => ({ ...state, isLoading: false, selectedUser: payload })),
    on(actions.loadUserFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.clearUserSelected, (state) => ({ ...state, isLoading: false, selectedUser: {} })),
    on(actions.clearUserSelectedFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.loadRoles, (state) => ({ ...state, isLoading: true })),
    on(actions.loadRolesSuccess, (state, { payload }) => ({ ...state, isLoading: false, roles: [...payload] })),
    on(actions.loadRolesFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.createUser, (state, { payload }) => ({
        ...state,
        isLoading: true,
        users: [...state.users,  payload],
    })),
    
    on(actions.createUserFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.editUser, (state, { payload, id }) => ({
        ...state,
        isLoading: true,
        users: [...state.users.map((user) => {
            if(user.id == id){
                let object:User = {...payload};
                object.id = id;
                return object;
            }
            return {...user};
        })]
    })),
    on(actions.editUserFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.updateUserRoles, (state, { payload, id }) => ({
        ...state,
        isLoading: true,
        users: [...state.users.map((user) => {
            if(user.id == id){
                let object:Role[] = [...payload];
                user.roles = object;
                return {...user};
            }
            return {...user};
        })]
    })),
    on(actions.updateUserFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),

    on(actions.removeUser, (state, { payload, id }) => ({
        ...state,
        isLoading: true,
        users: [...state.users.filter(user => user.id !== id)],
    })),
    on(actions.removeUserFailed, (state, { payload }) => ({ ...state, isLoading: false, hasError: true, errorMessage: payload })),
);


export function userReducer(state: UserState | undefined, action: Action) {
    return reducer(state, action);
}
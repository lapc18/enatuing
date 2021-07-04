import { createAction, props } from '@ngrx/store';
import { Role, User } from '../../domain/users/users.models';

//Users actions
export const loadUsers = createAction('[User Module] Loading Users');
export const loadUsersSuccess = createAction('[User Module] Users Loaded Successfully', props<{ payload: User[] }>());
export const loadUsersFailed = createAction('[User Module] Users Loaded Failed', props<{ payload: string }>());
export const createUser = createAction('[User Module] Creating User', props<{ payload: User }>());
export const createUserFailed = createAction('[User Module] Creating User Failed', props<{ payload: string }>());
export const editUser = createAction('[User Module] Editing User', props<{ payload: User, id: string | number}>());
export const editUserFailed = createAction('[User Module] Editing User Failed', props<{ payload: string }>());
export const removeUser = createAction('[User Module] Removing User', props<{ payload: User, id: string | number }>());
export const removeUserFailed = createAction('[User Module] Removing User Failed', props<{ payload: string }>());
export const onSuccess = createAction('[Action Status] Action excuted Successfully');

export const loadRoles = createAction('[User Module] Loading Roles');
export const loadRolesSuccess = createAction('[User Module] Roles Loaded Successfully', props<{ payload: Role[] }>());
export const loadRolesFailed = createAction('[User Module] Roles Loaded Failed', props<{ payload: string }>());
export const updateUserRoles = createAction('[User Module] Update user Roles', props<{ id: string, payload: Role[] }>());
export const updateUserSuccess = createAction('[User Module] User update Successfully');
export const updateUserFailed = createAction('[User Module] Update user Failed', props<{ payload: string }>());

export const loadUser = createAction('[User Module]  Loading User...', props<{ payload: string }>());
export const loadUserSuccess = createAction('[User Module] User Loaded Successfully', props<{ payload: User }>());
export const loadUserFailed = createAction('[User Module] User Loaded Failed', props<{ payload: string }>());

export const clearUserSelected = createAction('[User Module]  Cleaning User Selected...');
export const clearUserSelectedFailed = createAction('[User Module] User Clean Failed', props<{ payload: string }>());

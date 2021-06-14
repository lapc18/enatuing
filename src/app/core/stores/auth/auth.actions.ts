import { createAction, props } from '@ngrx/store';
import { SignIn } from '../../domain/auth/auth.models';
import { User } from '../../domain/users/users.models';

//Auth actions
export const onLogin = createAction('[Auth Module] Loggin in...', props<{ payload: SignIn }>());
export const onLoginSuccess = createAction('[Auth Module] Logged in Successfully', props<{ payload: User, tkn: string }>());
export const onLoginFails = createAction('[Auth Module] Logged in Fails', props<{ payload: string }>());
export const onRemoveUser = createAction('[Auth Module] Removing User...', props<{ payload: string }>());
export const onRemoveUserSuccess = createAction('[Auth Module] User removed Successfully', props<{ payload: boolean }>());
export const onRemoveUserFails = createAction('[Auth Module] Remove user action Fails', props<{ payload: string }>());

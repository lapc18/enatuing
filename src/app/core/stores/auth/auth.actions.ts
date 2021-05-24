import { createAction, props } from '@ngrx/store';
import { SignIn } from '../../domain/auth/auth.models';
import { User } from '../../domain/users/users.models';

//Auth actions
export const onLogin = createAction('[Auth Module] Loggin in...', props<{ payload: SignIn }>());
export const onLoginSuccess = createAction('[Auth Module] Logged in Successfully', props<{ payload: User }>());
export const onLoginFails = createAction('[Auth Module] Logged in Fails', props<{ payload: string }>());

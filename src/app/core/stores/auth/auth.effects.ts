import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";
import * as actions from './auth.actions';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private apiService: AuthService
    ) { }
    
    login$ = createEffect(() => this.actions$.pipe(
        ofType(actions.onLogin),
        mergeMap((payload) => this.apiService.signin(payload.payload).pipe(
                map((res) => (actions.onLoginSuccess({ payload: res }))),
                catchError((err) => of(actions.onLoginFails({ payload: `${err}` })))
            )
        )
    ));

    removeUser$ = createEffect(() => this.actions$.pipe(
        ofType(actions.onRemoveUser),
        mergeMap((payload) => this.apiService.remove(payload.payload).pipe(
                map((res) => (actions.onRemoveUserSuccess({ payload: res }))),
                catchError((err) => of(actions.onLoginFails({ payload: `${err}` })))
            )
        )
    ));

}
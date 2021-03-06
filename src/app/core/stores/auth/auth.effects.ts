import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { USER } from "../../models/constants.model";
import { AuthService } from "../../services/auth.service";
import * as actions from './auth.actions';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private apiService: AuthService,
        private router: Router
    ) { }
    
    login$ = createEffect(() => this.actions$.pipe(
        ofType(actions.onLogin),
        mergeMap((payload) => this.apiService.signin(payload.payload).pipe(
                map((res) => (actions.onLoginSuccess({ payload: res.user, tkn: res.tkn }))),
                tap(({payload, tkn}) => localStorage.setItem(USER, JSON.stringify({payload: payload, tkn: tkn}))),
                tap(() => this.router.navigate(['dashboard'])),
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

    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadUsers),
        mergeMap(() => this.apiService.getAllUser()
            .pipe(
                map(data => (actions.loadUsersSuccess({ payload: data }))),
                catchError((err) => of(actions.loadUsersFailed({ payload: `${err}` })))
            )
        )
    ));

}
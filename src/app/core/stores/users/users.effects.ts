import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import * as actions from './users.actions';


@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private apiService: UserService,
        private authService: AuthService
    ) { }

    loadUser$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadUser),
        mergeMap(({payload}) => this.authService.getUser(payload)
            .pipe(
                map(data => (actions.loadUserSuccess({ payload: data }))),
                catchError((err) => of(actions.loadUserFailed({ payload: `${err}` })))
            )
        )
    ));

    loadRoles$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadRoles),
        mergeMap(() => this.authService.getAllRoles()
            .pipe(                
                map(data => (actions.loadRolesSuccess({ payload: data }))),
                catchError((err) => of(actions.loadRolesFailed({ payload: `${err}` })))
            )
        )
    ));

    load$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadUsers),
        mergeMap(() => this.apiService.search()
            .pipe(
                map(data => (actions.loadUsersSuccess({ payload: data }))),
                catchError((err) => of(actions.loadUsersFailed({ payload: `${err}` })))
            )
        )
    ));

    
    save$ = createEffect(() => this.actions$.pipe(
        ofType(actions.createUser),
        mergeMap((payload) => this.authService.save(payload.payload).pipe(
                map(() => (actions.onSuccess())),
                catchError((err) => of(actions.createUserFailed({ payload: `${err}` })))
            )
        )
    ));

    update$ = createEffect(() => this.actions$.pipe(
        ofType(actions.updateUserRoles),
        mergeMap(({id, payload}) => this.authService.updateUserRoles(id, payload).pipe(
                map(() => (actions.onSuccess())),
                catchError((err) => of(actions.updateUserFailed({ payload: `${err}` })))
            )
        )
    ));

    removeUsers$ = createEffect(() => this.actions$.pipe(
        ofType(actions.removeUser),
        switchMap((action) => this.apiService.softDelete(action.payload.id)),
        switchMap(() => [actions.onSuccess(), actions.loadUsers()]),
        catchError((err) => of(actions.removeUserFailed({ payload: `${err}` })))
    ));

}
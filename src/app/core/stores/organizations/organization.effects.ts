import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { OrganizationService } from "../../services/organizations.service";
import * as actions from './organizations.actions';


@Injectable()
export class OrganizationEffects {

    constructor(
        private actions$: Actions,
        private apiService: OrganizationService
    ) { }

    load$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadOrganizations),
        mergeMap(() => this.apiService.search()
            .pipe(
                map(data => (actions.loadOrganizationsSuccess({ payload: data }))),
                catchError((err) => of(actions.loadOrganizationsFailed({ payload: `${err}` })))            
            )
        )
    ));
    
    save$ = createEffect(() => this.actions$.pipe(
        ofType(actions.createOrganizations),
        mergeMap((payload) => this.apiService.save(payload.payload).pipe(
                map(() => (actions.onSuccess())),
                catchError((err) => of(actions.createOrganizationsFailed({ payload: `${err}` })))
            )
        )
    ));

    update$ = createEffect(() => this.actions$.pipe(
        ofType(actions.editOrganizations),
        mergeMap((payload) => this.apiService.update({id: payload.id, payload: payload.payload}).pipe(
                map(() => (actions.onSuccess())),
                catchError((err) => of(actions.editOrganizationsFailed({ payload: `${err}` })))
            )
        )
    ));

    removeUsers$ = createEffect(() => this.actions$.pipe(
        ofType(actions.removeOrganizations),
        switchMap((action) => this.apiService.softDelete(action.payload.id)),
        switchMap(() => [actions.onSuccess(), actions.loadOrganizations()]),
        catchError((err) => of(actions.removeOrganizationsFailed({ payload: `${err}` })))
    ));

}
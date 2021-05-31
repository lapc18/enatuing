import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { ContactService } from "../../services/contacts.service";
import * as actions from './contacts.actions';


@Injectable()
export class ContactsEffects {

    constructor(
        private actions$: Actions,
        private apiService: ContactService
    ) { }

    load$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadContacts),
        mergeMap(() => this.apiService.search()
            .pipe(
                map(data => (actions.loadContactsSuccess({ payload: data }))),
                catchError((err) => of(actions.loadContactsFailed({ payload: `${err}` })))
            )
        )
    ));

    update$ = createEffect(() => this.actions$.pipe(
        ofType(actions.editContacts),
        map((action) => action.payload),
        mergeMap((entity) => this.apiService.update(entity).pipe(
            map(() => (actions.onSuccess())),
            catchError((err) => of(actions.editContactsFailed({ payload: `${err}` })))
        )
        )
    ));

    removeUsers$ = createEffect(() => this.actions$.pipe(
        ofType(actions.removeContacts),
        switchMap((action) => this.apiService.softDelete(action.payload.id)),
        // map(() => (actions.onSuccess())),
        switchMap(() => [actions.onSuccess(), actions.loadContacts()]),
        catchError((err) => of(actions.removeContactsFailed({ payload: `${err}` })))
    ));

}
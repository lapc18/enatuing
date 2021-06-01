import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { Normative } from "../../domain/normatives/normatives.models";
import { GenericTypeValue } from "../../models/enat.models";
import { ContactService } from "../../services/contacts.service";
import { NormativesService } from "../../services/normatives.service";
import * as actions from './normatives.actions';


@Injectable()
export class NormativesEffects {

    constructor(
        private actions$: Actions,
        private apiService: NormativesService
    ) { }

    load$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadNormatives),
        mergeMap(() => this.apiService.search()
            .pipe(
                map(data => {
                    data = data.map(x => {
                        return {
                            id: x.id,
                            color: x.color,
                            description: x.description,
                            publishetAt: x.publishetAt,
                            status: (x.status as GenericTypeValue).description,
                            statusId: x.statusId
                        }
                    });
                    return actions.loadNormativesSuccess({ payload: data })
                }),
                catchError((err) => of(actions.loadNormativesFailed({ payload: `${err}` })))
            )
        )
    ));

    loadNormativeStatuses$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadNormativeStatuses),
        mergeMap(() => this.apiService.searchStatuses()
            .pipe(
                map(data => (actions.loadNormativeStatusesSuccess({ payload: data }))),
                catchError((err) => of(actions.loadNormativeStatusesFailed({ payload: `${err}` })))
            )
        )
    ));
    
    save$ = createEffect(() => this.actions$.pipe(
        ofType(actions.createNormatives),
        mergeMap((payload) => this.apiService.save(payload.payload).pipe(
                map(() => (actions.onSuccess())),
                catchError((err) => of(actions.createNormativesFailed({ payload: `${err}` })))
            )
        )
    ));

    update$ = createEffect(() => this.actions$.pipe(
        ofType(actions.editNormatives),
        mergeMap((payload) => this.apiService.update({id: payload.id, payload: payload.payload}).pipe(
                map(() => (actions.onSuccess())),
                catchError((err) => of(actions.editNormativesFailed({ payload: `${err}` })))
            )
        )
    ));

    removeUsers$ = createEffect(() => this.actions$.pipe(
        ofType(actions.removeNormatives),
        switchMap((action) => this.apiService.softDelete(action.payload.id)),
        switchMap(() => [actions.onSuccess(), actions.loadNormatives()]),
        catchError((err) => of(actions.removeNormativesFailed({ payload: `${err}` })))
    ));

}
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { GenericTypeValue } from "../../models/enat.models";
import { QueueService } from "../../services/Queue.service";
import * as actions from './queue.actions';


@Injectable()
export class QueueEffects {

    constructor(
        private actions$: Actions,
        private apiService: QueueService
    ) { }

    load$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadQueue),
        mergeMap(() => this.apiService.search()
            .pipe(
                map(data => (actions.loadQueueSuccess({ payload: data }))),
                catchError((err) => of(actions.loadQueueFailed({ payload: `${err}` })))
            )
        )
    ));

    loadQueueStatuses$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadQueueStatuses),
        mergeMap(() => this.apiService.searchStatuses()
            .pipe(
                map(data => (actions.loadQueueStatusesSuccess({ payload: data }))),
                catchError((err) => of(actions.loadQueueStatusesFailed({ payload: `${err}` })))
            )
        )
    ));
    
    save$ = createEffect(() => this.actions$.pipe(
        ofType(actions.createQueue),
        mergeMap(({payload}) => this.apiService.save(payload).pipe(
                map(() => (actions.loadQueue())),
                catchError((err) => of(actions.createQueueFailed({ payload: `${err}` })))
            )
        )
    ));

    update$ = createEffect(() => this.actions$.pipe(
        ofType(actions.editQueue),
        mergeMap((payload) => this.apiService.update({id: payload.id, payload: payload.payload}).pipe(
                map(() => (actions.loadQueue())),
                catchError((err) => of(actions.editQueueFailed({ payload: `${err}` })))
            )
        )
    ));

    removeUsers$ = createEffect(() => this.actions$.pipe(
        ofType(actions.removeQueue),
        switchMap((action) => this.apiService.softDelete(action.id.toString())),
        switchMap(() => [actions.onSuccess(), actions.loadQueue()]),
        catchError((err) => of(actions.removeQueueFailed({ payload: `${err}` })))
    ));

}
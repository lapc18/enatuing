import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { QueueActionService } from "../../services/queue-action.service";
import { QueueUserActionService } from "../../services/queue-user-action.service";
import * as queueActions from '../queue/queue.actions';
import * as actions from './queue-user.actions';


@Injectable()
export class QueueUserEffects {

    constructor(
        private actions$: Actions,
        private apiService: QueueActionService,
        private queueUserActionService: QueueUserActionService
    ) { }

    load$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadQueueActions),
        mergeMap(() => this.apiService.search()
            .pipe(
                map(data => (actions.loadQueueActionsSuccess({ payload: data }))),
                catchError((err) => of(actions.loadQueueActionsFailed({ payload: `${err}` })))
            )
        )
    ));

    loadQueueUserActions$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadQueueUserAction),
        mergeMap(() => this.apiService.searchQueueUserActions()
            .pipe(
                map(data => (actions.loadQueueUserActionSuccess({ payload: data }))),
                catchError((err) => of(actions.loadQueueUserActionFailed({ payload: `${err}` })))
            )
        )
    ));

    saveQueueUserAction$ = createEffect(() => this.actions$.pipe(
        ofType(actions.createQueueUserAction),
        mergeMap(({payload}) => this.queueUserActionService.save(payload).pipe(
                map(() => (queueActions.loadQueue())),
                catchError((err) => of(actions.createQueueActionFailed({ payload: `${err}` })))
            )
        )
    ));
    
    save$ = createEffect(() => this.actions$.pipe(
        ofType(actions.createQueueAction),
        mergeMap(({payload}) => this.apiService.save(payload).pipe(
                map(() => (actions.onSuccess())),
                catchError((err) => of(actions.createQueueActionFailed({ payload: `${err}` })))
            )
        )
    ));

    update$ = createEffect(() => this.actions$.pipe(
        ofType(actions.editQueueAction),
        mergeMap((payload) => this.apiService.update({id: payload.id, payload: payload.payload}).pipe(
                map(() => (actions.onSuccess())),
                catchError((err) => of(actions.editQueueActionFailed({ payload: `${err}` })))
            )
        )
    ));

}
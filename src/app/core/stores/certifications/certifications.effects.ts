import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { CertificationsService } from "../../services/Certifications.service";
import * as actions from './certifications.actions';


@Injectable()
export class CertificationsEffects {

    constructor(
        private actions$: Actions,
        private apiService: CertificationsService
    ) { }

    load$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadCertifications),
        mergeMap(() => this.apiService.search()
            .pipe(
                map(data => (actions.loadCertificationsSuccess({ payload: data }))),
                catchError((err) => of(actions.loadCertificationsFailed({ payload: `${err}` })))
            )
        )
    ));
    
    save$ = createEffect(() => this.actions$.pipe(
        ofType(actions.createCertifications),
        mergeMap((payload) => this.apiService.save(payload.payload).pipe(
                map((res) => (actions.onCertificationCreated({payload: res}))),
                catchError((err) => of(actions.createCertificationsFailed({ payload: `${err}` })))
            )
        )
    ));

    update$ = createEffect(() => this.actions$.pipe(
        ofType(actions.editCertifications),
        mergeMap((payload) => this.apiService.update({id: payload.id, payload: payload.payload}).pipe(
                map(() => (actions.onSuccess())),
                catchError((err) => of(actions.editCertificationsFailed({ payload: `${err}` })))
            )
        )
    ));

    remove$ = createEffect(() => this.actions$.pipe(
        ofType(actions.removeCertifications),
        switchMap((action) => this.apiService.softDelete(action.payload)),
        switchMap(() => [actions.onSuccess(), actions.loadCertifications()]),
        catchError((err) => of(actions.removeCertificationsFailed({ payload: `${err}` })))
    ));

}
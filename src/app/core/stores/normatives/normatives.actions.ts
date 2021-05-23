import { createAction, props } from '@ngrx/store';
import { Normative } from '../../domain/normatives/normatives.models';

//Normatives actions
export const loadNormatives = createAction('[Normatives Module] Loading Normatives');
export const loadNormativesSuccess = createAction('[Normatives Module] Normatives Loaded Successfully', props<{ payload: Normative[] }>());
export const loadNormativesFailed = createAction('[Normatives Module] Normatives Loaded Failed', props<{ payload: string }>());
export const createNormatives = createAction('[Normatives Module] Creating Normatives', props<{ payload: Normative }>());
export const createNormativesFailed = createAction('[Normatives Module] Creating Normatives Failed', props<{ payload: string }>());
export const editNormatives = createAction('[Normatives Module] Editing Normatives', props<{ payload: Normative, id: string | number}>());
export const editNormativesFailed = createAction('[Normatives Module] Editing Normatives Failed', props<{ payload: string }>());
export const removeNormatives = createAction('[Normatives Module] Removing Normatives', props<{ payload: Normative, id: string | number }>());
export const removeNormativesFailed = createAction('[Normatives Module] Removing Normatives Failed', props<{ payload: string }>());
export const onSuccess = createAction('[Action Status] Action excuted Successfully');

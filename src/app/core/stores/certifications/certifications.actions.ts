import { createAction, props } from '@ngrx/store';
import { Certification } from '../../domain/certifications/certifications.models';

//Certifications actions
export const loadCertifications = createAction('[Certification Module] Loading Certifications');
export const loadCertificationsSuccess = createAction('[Certification Module] Certifications Loaded Successfully', props<{ payload: Certification[] }>());
export const loadCertificationsFailed = createAction('[Certification Module] Certifications Loaded Failed', props<{ payload: string }>());
export const createCertifications = createAction('[Certification Module] Creating Certifications', props<{ payload: Certification }>());
export const createCertificationsFailed = createAction('[Certification Module] Creating Certifications Failed', props<{ payload: string }>());
export const editCertifications = createAction('[Certification Module] Editing Certifications', props<{ payload: Certification, id: string | number}>());
export const editCertificationsFailed = createAction('[Certification Module] Editing Certifications Failed', props<{ payload: string }>());
export const removeCertifications = createAction('[Certification Module] Removing Certifications', props<{ payload: Certification, id: string | number }>());
export const removeCertificationsFailed = createAction('[Certification Module] Removing Certifications Failed', props<{ payload: string }>());
export const onSuccess = createAction('[Action Status] Action excuted Successfully');

import { createAction, props } from '@ngrx/store';
import { Organization } from '../../domain/Organizations/Organizations.models';
import { City } from '../../models/enat.models';

//Organizations actions
export const loadCities = createAction('[Organization Module] Loading Cities...');
export const loadCitiesSuccess = createAction('[Organization Module] Cities Loaded Successfully', props<{ payload: City[] }>());
export const loadCitiesFailed = createAction('[Organization Module] Cities Loaded Failed', props<{ payload: string }>());
export const loadOrganizations = createAction('[Organization Module] Loading Organizations');
export const loadOrganizationsSuccess = createAction('[Organization Module] Organizations Loaded Successfully', props<{ payload: Organization[] }>());
export const loadOrganizationsFailed = createAction('[Organization Module] Organizations Loaded Failed', props<{ payload: string }>());
export const createOrganizations = createAction('[Organization Module] Creating Organizations', props<{ payload: Organization }>());
export const createOrganizationsFailed = createAction('[Organization Module] Creating Organizations Failed', props<{ payload: string }>());
export const editOrganizations = createAction('[Organization Module] Editing Organizations', props<{ payload: Organization, id: string | number}>());
export const editOrganizationsFailed = createAction('[Organization Module] Editing Organizations Failed', props<{ payload: string }>());
export const removeOrganizations = createAction('[Organization Module] Removing Organizations', props<{ payload: Organization, id: string | number }>());
export const removeOrganizationsFailed = createAction('[Organization Module] Removing Organizations Failed', props<{ payload: string }>());
export const onSuccess = createAction('[Action Status] Action excuted Successfully');

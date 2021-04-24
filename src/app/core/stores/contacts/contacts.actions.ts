import { createAction, props } from '@ngrx/store';
import { Contact } from '../../domain/contacts/contacts.models';

//Contacts actions
export const loadContacts = createAction('[Contact Module] Loading Contacts');
export const loadContactsSuccess = createAction('[Contact Module] Contacts Loaded Successfully', props<{ payload: Contact[] }>());
export const loadContactsFailed = createAction('[Contact Module] Contacts Loaded Failed', props<{ payload: string }>());
export const createContacts = createAction('[Contact Module] Creating Contacts', props<{ payload: Contact }>());
export const createContactsuccess = createAction('[Contact Module] Contacts Created Successfully');
export const createContactsFailed = createAction('[Contact Module] Creating Contacts Failed', props<{ payload: string }>());
export const editContacts = createAction('[Contact Module] Editing Contacts', props<{ payload: Contact, id: string | number}>());
export const editContactsuccess = createAction('[Contact Module] Contacts Edited Successfully');
export const editContactsFailed = createAction('[Contact Module] Editing Contacts Failed', props<{ payload: string }>());
export const removeContacts = createAction('[Contact Module] Removing Contacts', props<{ payload: Contact }>());
export const removeContactsuccess = createAction('[Contact Module] Contacts Removed Successfully');
export const removeContactsFailed = createAction('[Contact Module] Removing Contacts Failed', props<{ payload: string }>());
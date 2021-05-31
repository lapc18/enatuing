import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContactsEntity } from "../domain/contacts/contacts.entity";
import { Contact } from "../domain/contacts/contacts.models";
import { AbstractEnatService } from "../models/base-service.abstract";
import { columnSettings } from "../models/enat.models";
import { baseServiceOptions } from "../models/service-properties.model";


@Injectable()
export class ContactService extends AbstractEnatService<Contact, ContactsEntity> {

    constructor(
        public http: HttpClient,
    ) {
        super(http, columnSettings.contacts, baseServiceOptions.contacts);
    }

}
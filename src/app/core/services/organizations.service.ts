import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Certification } from "../domain/certifications/certifications.models";
import { AbstractEnatService } from "../models/base-service.abstract";
import { columnSettings } from "../models/enat.models";
import { baseServiceOptions } from "../models/service-properties.model";


@Injectable()
export class OrganizationService extends AbstractEnatService<Certification, {}> {

    constructor(
        public http: HttpClient,
    ) {
        super(http, columnSettings.contacts, baseServiceOptions.contacts);
    }

}
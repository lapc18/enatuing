import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { OrganizationEntity } from "../domain/organizations/organizations.entity";
import { Organization } from "../domain/organizations/organizations.models";
import { AbstractEnatService } from "../models/base-service.abstract";
import { City, columnSettings } from "../models/enat.models";
import { baseServiceOptions } from "../models/service-properties.model";


@Injectable()
export class OrganizationService extends AbstractEnatService<Organization, OrganizationEntity> {

    constructor(
        public http: HttpClient,
    ) {
        super(http, columnSettings.contacts, baseServiceOptions.organization);
    }

    getCities(): Observable<City[]> {
        return this.http.get<any>('/assets/mocks/dom-cities.json').pipe(map(res => res.cities));
    }
}
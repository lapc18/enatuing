import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NormativeEntity } from "../domain/normatives/normatives.entity";
import { Normative } from "../domain/normatives/normatives.models";
import { AbstractEnatService } from "../models/base-service.abstract";
import { columnSettings, GenericTypeValue } from "../models/enat.models";
import { baseServiceOptions } from "../models/service-properties.model";


@Injectable()
export class NormativesService extends AbstractEnatService<Normative, NormativeEntity> {

    constructor(
        public http: HttpClient,
    ) {
        super(http, columnSettings.normatives, baseServiceOptions.normatives);
    }


    searchStatuses(): Observable<GenericTypeValue[]> {
        return this.http.get<GenericTypeValue[]>('/optic/enat/api/NormativeStatus');
    }

}
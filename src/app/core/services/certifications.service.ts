import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CertificationEntity } from "../domain/certifications/certifications.entity";
import { Certification, CertificationModel } from "../domain/certifications/certifications.models";
import { AbstractEnatService } from "../models/base-service.abstract";
import { columnSettings } from "../models/enat.models";
import { baseServiceOptions } from "../models/service-properties.model";


@Injectable()
export class CertificationsService extends AbstractEnatService<CertificationModel, CertificationEntity> {

    constructor(
        public http: HttpClient,
    ) {
        super(http, columnSettings.certifications, baseServiceOptions.certifications);
    }

}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { QueueEntity } from "../domain/queue/queue.entity";
import { QueueModel, QueueStatus } from "../domain/queue/queue.models";
import { AbstractEnatService } from "../models/base-service.abstract";
import { columnSettings } from "../models/enat.models";
import { baseServiceOptions } from "../models/service-properties.model";


@Injectable()
export class QueueService extends AbstractEnatService<QueueModel, QueueEntity> {

    constructor(
        public http: HttpClient,
    ) {
        super(http, columnSettings.queue, baseServiceOptions.queue);
    }


    public save(item: QueueModel): Observable<any> {
        
        this.item = new QueueEntity({
            auditorId: item.auditor.id,
            consultantId: item.consultant.id,
            contactId: item.contact.id,
            normativeId: item.normative.id,
            organizationId: item.organization.id
        });

        return this.http.post(this.options.endpoint, this.item);
    }

    public searchStatuses(): Observable<QueueStatus[]> {
        const url: string = `/optic/enat/api/QueueStatus`;
        return this.http.get<QueueStatus[]>(url);
    }

}
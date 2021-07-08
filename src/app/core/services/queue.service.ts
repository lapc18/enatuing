import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { QueueEntity } from "../domain/queue/queue.entity";
import { QueueModel, QueueStatus } from "../domain/queue/queue.models";
import { AbstractEnatService } from "../models/base-service.abstract";
import { columnSettings } from "../models/enat.models";
import { baseServiceOptions } from "../models/service-properties.model";


@Injectable()
export class QueueService extends AbstractEnatService<any, any> {

    constructor(
        public http: HttpClient,
    ) {
        super(http, columnSettings.queue, baseServiceOptions.queue);
    }

    public searchStatuses(): Observable<QueueStatus[]> {
        const url: string = `/optic/enat/api/QueueStatus`;
        return this.http.get<QueueStatus[]>(url);
    }

}
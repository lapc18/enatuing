import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { QueueAction, QueueUserAction } from "../domain/queue-user/queue-user.model";
import { QueueEntity } from "../domain/queue/queue.entity";
import { QueueModel, QueueStatus } from "../domain/queue/queue.models";
import { AbstractEnatService } from "../models/base-service.abstract";
import { columnSettings } from "../models/enat.models";
import { baseServiceOptions } from "../models/service-properties.model";


@Injectable()
export class QueueUserActionService extends AbstractEnatService<QueueUserAction, any> {

    constructor(
        public http: HttpClient,
    ) {
        super(http, columnSettings.queue, baseServiceOptions.queueUserAction);
    }

}
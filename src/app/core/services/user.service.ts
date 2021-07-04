import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserEntity } from "../domain/users/users.entity";
import { User } from "../domain/users/users.models";
import { AbstractEnatService } from "../models/base-service.abstract";
import { columnSettings } from "../models/enat.models";
import { baseServiceOptions } from "../models/service-properties.model";


@Injectable()
export class UserService extends AbstractEnatService<User, UserEntity> {

    constructor(
        public http: HttpClient,
    ) {
        super(http, columnSettings.user, baseServiceOptions.users);
    }

}
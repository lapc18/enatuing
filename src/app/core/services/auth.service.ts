import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SignIn } from "../domain/auth/auth.models";
import { User } from "../domain/users/users.models";

@Injectable()
export class AuthService {

    private api: any = {
        signin: '/optic/identity/auth',
        signup: '/optic/Identity/user',
        getAllUsers: '/optic​/Identity​/user',
        getUserByEmail: '​/optic​/Identity​/user​/',
        putUserWithEmail: '​/optic​/Identity​/user​/', 
        removeUserWithId: '​/optic​/Identity​/user​/',
        role: '/optic/Roles'
    };

    constructor(
        private http: HttpClient
    ) {

    }

    signin(model: SignIn): Observable<User> {
        return this.http.post<User>(this.api.signin, model);
    }

    signup(model: User): Observable<User> {
        return this.http.post<User>(this.api.signup, model);
    }

    remove(id: string): Observable<boolean> {
        const url: string = `${this.api.removeUserWithId}/${id}`;
        return this.http.delete<boolean>(url);
    }

}
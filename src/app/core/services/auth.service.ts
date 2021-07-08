import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SignIn } from "../domain/auth/auth.models";
import { Role, User } from "../domain/users/users.models";

@Injectable()
export class AuthService {

    private api: any = {
        signin: '/optic/Identity/auth',
        signup: '/optic/Identity/user',
        users: '/optic/Identity/user',
        role: '/optic/Roles'
    };

    constructor(
        private http: HttpClient
    ) { }

    signin(model: SignIn): Observable<{tkn: string, user: User}> {
        return this.http.post<{tkn: string, user: User}>(this.api.signin, model);
    }

    signup(model: User): Observable<User> {
        return this.http.post<User>(this.api.signup, model);
    }

    remove(id: string): Observable<boolean> {
        const url: string = `${this.api.users}/${id}`;
        return this.http.delete<boolean>(url);
    }

    getAllRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(this.api.role).pipe(map((res: any) => res.data));
    }

    getAllUser(): Observable<User[]> {
        return this.http.get<User[]>(this.api.users).pipe(map((res: any) => res.data as User[]));
    }

    getUser(email: string): Observable<User> {
        const url: string = '/optic/Identity/user/' + encodeURIComponent(email);
        return this.http.get<User>(url).pipe(map((res: any) => {
            if(res && res.data) {
                res.data.roles = res.data.roles.map(r => r.id);
            }
            return res.data;
        }));
    }

    updateUserRoles(id: string, roles:Role[]): Observable<User> {
        console.log('updateUserRoles');
        const url: string = '/optic/Identity/roles/' + id;
        return this.http.put<User>(url, roles);
    }

    save(user: User): Observable<User> {
        const url: string = '/optic/Identity/user';
        return this.http.post<User>(url, user);
    }

}
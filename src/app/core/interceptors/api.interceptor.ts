import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../stores/auth/auth.reducer';
import { User } from '../domain/users/users.models';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  public user: User = null;
  public tkn: string = '';
  
  constructor(
    private router: Router,
    private store: Store<{ auth: AuthState }>
  ) {
    this.store.pipe(select(state => state.auth.currentUser)).subscribe(res => this.user = res);
    this.store.pipe(select(state => state.auth.tkn)).subscribe(res => this.tkn = res);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url:string = `${environment.api}${request.url}`.toString();
    console.log(`requesting to::: `, url);
    console.log(`requesting tkn::: `, this.tkn);
    console.log(`requesting user::: `, this.user.email);
    
    if (!this.user || !this.tkn) {
			this.router.navigate(['auth/enat/signin']);
		}

    let req = request.clone({
      url: url,
      setHeaders: {
        'Authorization': `Bearer ${this.tkn}`,
        'access-control-allow-origin': '*'
      }
    });
    return next.handle(req);
  }
}

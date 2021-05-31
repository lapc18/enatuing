import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TOKEN } from '../models/constants.model';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url:string = `${environment.api}${request.url}`.toString();
    console.log(`requesting to::: `, url);
    const token = localStorage.getItem(TOKEN);
    if (!token) {
      console.log('token null');
    } 
    
    let req = request.clone({
      url: url,
      setHeaders: {
        // 'Authorization': `Bearer ${token}`,
        'access-control-allow-origin': '*'
      }
    });
    return next.handle(req);
  }
}

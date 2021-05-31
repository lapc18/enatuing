import { HttpClient } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";
import { IBaseService, IColumn } from "./enat.models";
import { IServiceOptions } from "./service-properties.model";

export abstract class AbstractEnatService<T, E> implements IBaseService<T> {

    public item: E = ({} as E);
    private subscriptions:Subscription[] = [];

    constructor(
        protected http: HttpClient,
        protected columnSettings: IColumn[],
        protected options: IServiceOptions
    ) {

    }

    public addSubscription(subscription: Subscription): void {
        this.subscriptions.push(subscription);
    }

    public unsubscribe(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    public search(params?: any): Observable<T[]> {
        let url:string = this.options.endpoint;
        if(params){
            //TODO: set params into the request
        }

        return this.http.get<T[]>(url);
    }

    
    public update(params?: any): Observable<T> {
        let url:string = this.options.endpoint;
        let body: any = {};
        if(params){
            if((params as Object).hasOwnProperty('id') && (params as Object).hasOwnProperty('payload')) {
                url = `${url}/${params.id}`;
                body = {...params.payload}
            }
        }

        return this.http.put<T>(url, body);
    }
    
    public softDelete(id?: string): Observable<any> {
        if(!id) throw new Error("No ID param provided.");
        let url:string = `${this.options.endpoint}/${id}`;
        return this.http.delete<any>(url);
    }

    public save(item: T): Observable<any> {
        Object.assign(this.item, item);
        return this.http.post(this.options.endpoint, this.item);
    }

}
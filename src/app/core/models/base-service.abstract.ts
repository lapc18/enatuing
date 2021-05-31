import { HttpClient } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";
import { IBaseService, IColumn } from "./enat.models";
import { IServiceOptions } from "./service-properties.model";

export abstract class AbstractEnatService<T, E> implements IBaseService<T> {

    public item: E;
    private subscriptions:Subscription = new Subscription();

    constructor(
        protected http: HttpClient,
        protected columnSettings: IColumn[],
        protected options: IServiceOptions
    ) {

    }

    public addSubscription(subscription: Subscription): void {
        this.subscriptions.add(subscription);
    }

    public unsubscribe(): void {
        this.subscriptions.unsubscribe();
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
            if((params as Object).hasOwnProperty('id') && (params as Object).hasOwnProperty('body')) {
                url = `${url}/${params.id}`;
            }
        }

        return this.http.put<T>(url, body);
    }
    
    public softDelete(id?: string): Observable<any> {
        if(!id) throw new Error("No ID param provided.");
        let url:string = `${this.options.endpoint}?id=${id}`;
        return this.http.delete<any>(url);
    }

    public save(item: T): Observable<any> {
        Object.assign(item, this.item);
        console.log(this.item)
        console.log(item)
        if(!this.item) {
            throw new Error("Method not implemented.");
        }
        return this.http.post(this.options.endpoint, this.item);
    }

}
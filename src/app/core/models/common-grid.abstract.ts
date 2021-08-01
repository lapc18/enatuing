import { SelectionModel } from "@angular/cdk/collections";
import { Observable, Subscription } from "rxjs";
import { FileType, IColumn } from "./enat.models";

export abstract class CommonAbstractGrid<T, E = any> {

    public selectedData: SelectionModel<T> = new SelectionModel<T>(true, []);
    public subscriptions: Subscription[] = [];
    public isLoading$: Observable<boolean>;
    public isLoading: boolean;
    public data$: Observable<T[]>;
    public data: T[] = [];
    public columns: IColumn[] = [];
    public filter: string = '';

    constructor(
        public columnSettings: IColumn[]
    ) {
        this.columns = this.columnSettings;
    }

    public abstract loadData(): void;
    public abstract onCreate(): void;
    public abstract onEdit(item: T | E): void;
    public abstract onDelete(item: T | E): void;
    public abstract onSeeDetails(item: T | E): void;
    public abstract onExport(fileType?: FileType): void;

}
import { Observable } from "rxjs";
import { ExportService } from "../services/export.service";
import { FileType, IColumn } from "./enat.models";

export abstract class CommonAbstractGrid<T> {

    public isLoading$: Observable<boolean>;
    public isLoading: boolean;
    public data$: Observable<T[]>;
    public data: T[] = [];
    public columns: IColumn[] = [];
    public fiter: string = '';

    constructor(
        public columnSettings: IColumn[]
    ) {
        this.columns = this.columnSettings;
    }

    public abstract loadData(): void;
    public abstract onCreate(): void;
    public abstract onEdit(item: T): void;
    public abstract onDelete(item: T): void;
    public abstract onSeeDetails(item: T): void;
    public abstract onExport(fileType?: FileType): void;

}
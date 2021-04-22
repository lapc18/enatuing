import { IColumn } from "./enat.models";

export abstract class CommonAbstractGrid {

    public data: any[] = [];
    public columns: IColumn[] = [];

    constructor(
        public columnSettings: IColumn[]
    ) {
        this.columns = this.columnSettings;
    }

    public abstract loadData(): void;
    public abstract onCreate(): void;
    public abstract onEdit(item: any): void;
    public abstract onDelete(item: any): void;
    public abstract onSeeDetails(item: any): void;

}
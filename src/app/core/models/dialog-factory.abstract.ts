import { Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


export abstract class AbstractDialogComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<AbstractDialogComponent>
    ){ }

    public close(): void {
        this.dialogRef.close();
    }

}
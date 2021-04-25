import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogComponent } from 'src/app/core/models/dialog-factory.models';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements IDialogComponent, OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmationComponent>
  ) {  }

  ngOnInit(): void {
  }

  public close(): void {
    this.dialogRef.close();
  }

  public onConfirm(): void {
    this.data && this.data.callback ? this.data.callback() : void 0;
    this.close();
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-yes-or-no',
  templateUrl: './yes-or-no.component.html',
  styleUrls: ['./yes-or-no.component.scss']
})
export class YesOrNoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<YesOrNoComponent>
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

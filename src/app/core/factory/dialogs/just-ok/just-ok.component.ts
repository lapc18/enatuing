import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-just-ok',
  templateUrl: './just-ok.component.html',
  styleUrls: ['./just-ok.component.scss']
})
export class JustOkComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<JustOkComponent>
  ) {  }

  ngOnInit(): void {
  }

  public close(): void {
    this.dialogRef.close();
  }

}

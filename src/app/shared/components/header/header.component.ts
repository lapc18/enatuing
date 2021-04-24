import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FileType } from 'src/app/core/models/enat.models';

@Component({
  selector: 'common-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() data: any = [];
  @Input() filter: string;

  @Output() onExport: EventEmitter<FileType> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  exportToExcel(event: any): void {
    this.onExport.emit(FileType.excel);
  }

}

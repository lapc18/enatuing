import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FileType } from 'src/app/core/models/enat.models';

@Component({
  selector: 'common-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public filter: string;
  
  @Input() data: any = [];

  @Output() onExport: EventEmitter<FileType> = new EventEmitter();
  @Output() onFilter: EventEmitter<string> = new EventEmitter();
  @Output() onAddItem: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  exportToExcel(event: any): void {
    this.onExport.emit(FileType.excel);
  }

}

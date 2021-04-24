import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FileType } from 'src/app/core/services/export.service';

@Component({
  selector: 'common-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() data: any = [];
  @Input() filter: string;

  @Output() onExport: EventEmitter<string> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  exportToExcel(event: any): void {
    this.onExport.emit(FileType.excel);
  }

}

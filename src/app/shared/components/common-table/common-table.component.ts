import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { IColumn } from '../../../core/models/enat.models';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent implements OnInit, AfterViewInit, OnChanges {
 
  @Input() dataSource: any[] = [];
  @Input() columns: IColumn[] = [];
  @Input() filterBy: string = '';
  @Input() showCustomActions: boolean = false;

  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onDetails: EventEmitter<any> = new EventEmitter();
  @Output() onEdit: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public paginatedDataSource: MatTableDataSource<any[]>;
  public displayedColumns: string[];
  public length: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(c => c.name);
    this.displayedColumns.push('actions');
  }

  ngAfterViewInit(): void {
    this.paginatedDataSource.paginator = this.paginator;
    this.paginatedDataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadOnChanges(changes);
  }

  public delete(event: any): void {
    this.onDelete.emit(event);
  }

  public details(event: any): void {
    this.onDetails.emit(event);
  }

  public edit(event: any): void {
    this.onEdit.emit(event);
  }

  private onFilter(): void {
    this.paginatedDataSource.filter = this.filterBy.toLowerCase();
    this.resetPagination();
  }

  public resetPagination(): void {
    if (this.paginatedDataSource.paginator) {
      this.paginatedDataSource.paginator.firstPage();
    }
  }

  private onUpdateDataSource(): void {
    this.paginatedDataSource = new MatTableDataSource<any[]>(this.dataSource);
    this.paginatedDataSource.paginator = this.paginator;
  }

  private loadOnChanges(changes: SimpleChanges): void {
    if((changes as Object).hasOwnProperty('dataSource')) this.onUpdateDataSource();
    if((changes as Object).hasOwnProperty('filterBy')) this.onFilter();
  }

}

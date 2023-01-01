import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableData } from '../../models/table-data.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  displayedColumns: string[] = [];
  propertyNames: string[] = [];
  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;

  @Input() set tableData(value: TableData) {
    this.displayedColumns = value.displayedColumns;
    this.propertyNames = value.propertyNames;
    this.dataSource = new MatTableDataSource(value.data);
  }

  constructor() {}

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  handlePageEvent(event: any) {
    console.log(event)
  }

}

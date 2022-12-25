import { Component, OnInit, Input } from '@angular/core';
import { TableData } from '../../models/table-data.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  dataSource: any = [];
  displayedColumns: string[] = [];
  propertyNames: string[] = [];

  @Input() set tableData(value: TableData) {
    this.displayedColumns = value.displayedColumns;
    this.dataSource = value.data;
    this.propertyNames = value.propertyNames;
  }

  constructor() {}

  ngOnInit(): void {
  }

}

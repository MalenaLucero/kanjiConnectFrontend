import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})


export class TableComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: any = []

  @Input() set columnTitles(titles: string[]) {
    this.displayedColumns = titles;
  }

  @Input() set dataToDisplay(data: any[]) {
    this.dataSource = data;
  }

  constructor() {}

  ngOnInit(): void {
  }

}

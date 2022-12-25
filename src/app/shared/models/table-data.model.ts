export interface TableData {
  data: any[],
  displayedColumns: string[],
  propertyNames: string[],
}

export const emptyTableData: TableData = {
  data: [],
  displayedColumns: [],
  propertyNames: [],
}

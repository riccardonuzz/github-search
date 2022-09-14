import { Component, ViewChild } from "@angular/core";
import { TableComponent } from "src/app/shared/components/table/table.component";

export interface ExampleDataType {
    name: string,
    lastName: string
  }

@Component({
    template: `
      <ng-template #rowTemplate let-entry>
          <td>
              {{entry.name}}
          </td>
          <td>
              {{entry.lastName}}
          </td>
      </ng-template>
      <app-table
            [rowTemplate]="rowTemplate"
            [data]="data"
      ></app-table> 
    `,
})
export class TableWrapperComponent {
    @ViewChild(TableComponent, { static: true }) appComponentRef: TableComponent<ExampleDataType> | null = null;

    data: Array<ExampleDataType> = []
}
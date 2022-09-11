import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
  @Input() headers: Array<string> = []
  @Input() data: Array<Object> = []
  @Input() rowTemplate: TemplateRef<Element> | null = null

  constructor() { }

  ngOnInit(): void {
  }

}

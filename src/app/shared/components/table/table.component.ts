import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T> implements OnInit {
  @Input() headers: Array<string> = []
  @Input() data: Array<T> | null = []
  @Input() rowTemplate: TemplateRef<Element> | null = null
  @Input() loading: boolean = false
  @Input() loadingLabel: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}

import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReposSearchFormValues } from './repos-search-form.model';

@Component({
  selector: 'app-repos-search-form',
  templateUrl: './repos-search-form.component.html',
  styleUrls: ['./repos-search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReposSearchFormComponent implements OnInit {
  @Output() submitForm = new EventEmitter<Partial<ReposSearchFormValues>>()

  reposSearchForm = new FormGroup({
    name: new FormControl(''),
    language: new FormControl(''),
    stars: new FormControl(0),
    issueTitle: new FormControl('')
  });


  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitForm.emit(this.reposSearchForm.value)
  }

}

import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IssuesSearchFormValues, ReposSearchFormValues } from './repos-search-form.model';

@Component({
  selector: 'app-repos-search-form',
  templateUrl: './repos-search-form.component.html',
  styleUrls: ['./repos-search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReposSearchFormComponent implements OnInit {
  @Output() reposSubmitForm = new EventEmitter<Partial<ReposSearchFormValues>>()
  @Output() issuesSubmitForm = new EventEmitter<IssuesSearchFormValues>()


  reposSearchForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    language: new FormControl(''),
    stars: new FormControl(0, [Validators.min(0)]),
  });

  issueSearchForm = new FormGroup({
    issueTitle: new FormControl('', [Validators.required])
  });


  constructor() { }

  ngOnInit(): void {
  }

  onRepoSubmit() {
    if (!this.reposSearchForm.invalid) {
      this.reposSubmitForm.emit(this.reposSearchForm.value)
    }
  }

  onIssueSearchSubmit() {
    if (!this.issueSearchForm.invalid) {
      this.issuesSubmitForm.emit(this.issueSearchForm.value as IssuesSearchFormValues)
    }
  }

}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    name: new FormControl('', [Validators.required]),
    language: new FormControl(''),
    stars: new FormControl(0),
    issueTitle: new FormControl('')
  });


  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.reposSearchForm.controls)
    this.changeDetectorRef.detectChanges()
    if (!this.reposSearchForm.invalid) {
      this.submitForm.emit(this.reposSearchForm.value)
    } else {

    }
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommitsSearchFormValues } from './commits-search.model';

@Component({
  selector: 'app-commits-search-form',
  templateUrl: './commits-search-form.component.html',
  styleUrls: ['./commits-search-form.component.scss']
})
export class CommitsSearchFormComponent implements OnInit {
  @Output() commitsSubmitForm = new EventEmitter<Partial<CommitsSearchFormValues>>()

  commitsSearchForm = new FormGroup({
    text: new FormControl('', [Validators.required]),
  });


  constructor() { }

  ngOnInit(): void {
  }

  onCommitsSearchSubmit() {
    if (!this.commitsSearchForm.invalid) {
      this.commitsSubmitForm.emit(this.commitsSearchForm.value)
    }
  }
}

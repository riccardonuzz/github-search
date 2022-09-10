import { Component, OnInit } from '@angular/core';
import { ReposSearchFormValues } from './repos-search-form/repos-search-form.model';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  searchRepos(formValues: Partial<ReposSearchFormValues>) {
    console.log(formValues)
  }

  
}

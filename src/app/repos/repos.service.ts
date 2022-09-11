import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ReposSearchFormValues } from './repos-search-form/repos-search-form.model';

@Injectable()
export class ReposService {
  repositories$ = new Subject()

  constructor(private httpClient: HttpClient) { }

  fetchRepositories(formValues: Partial<ReposSearchFormValues>) {
    const params = new HttpParams()
      .set('q', 'react in:name')

    this.httpClient.get('https://api.github.com/search/repositories', { params })
      .subscribe({
        next: data => this.repositories$.next(data)
      })
  }
}

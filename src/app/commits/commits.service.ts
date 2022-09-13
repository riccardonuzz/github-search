import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommitsSearchFormValues } from './commits-search-form/commits-search.model';
import { CommitsSearchResponse } from './commits.model';

@Injectable()
export class CommitsService {
  commits$ = new Subject<CommitsSearchResponse["items"]>()

  constructor(private httpClient: HttpClient) { }


  fetchCommits(owner: string, repo: string, formValues: Partial<CommitsSearchFormValues>) {
    const params = new HttpParams()
      .set('q', `${formValues.text} repo:${owner}/${repo}`)
    // .set('q', this.buildSearchQuery(formValues))

    this.httpClient.get<CommitsSearchResponse>('https://api.github.com/search/commits', { params })
      .subscribe({
        next: (data: CommitsSearchResponse) => this.commits$.next(data.items)
      })
  }
}

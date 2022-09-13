import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommitsSearchFormValues } from './commits-search-form/commits-search.model';
import { CommitsSearchResponse } from './commits.model';

@Injectable()
export class CommitsService {
  commits$ = new Subject<CommitsSearchResponse["items"]>()

  constructor(private httpClient: HttpClient) { }


  /**
   * @description Fetch commits of a given repository "owner/name"
   */
  fetchCommits(owner: string, repo: string, text: string = '') {
    const searchText = text ? `${text} ` : ''
    const params = new HttpParams()
      .set('q', `${searchText}repo:${owner}/${repo}`)

    this.httpClient.get<CommitsSearchResponse>('https://api.github.com/search/commits', { params })
      .subscribe({
        next: (data: CommitsSearchResponse) => this.commits$.next(data.items)
      })
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, delay, mergeMap, of, Subject, switchMap, take, timer, toArray } from 'rxjs';
import { IssuesSearchFormValues, ReposSearchFormValues } from './repos-search-form/repos-search-form.model';
import { IssuesSearchResponse, RepositororiesSearchResponse } from './repos-search.model';

@Injectable()
export class ReposService {
  repositories$ = new Subject<RepositororiesSearchResponse["items"]>()

  constructor(private httpClient: HttpClient) { }

  buildSearchQuery(formValues: Partial<ReposSearchFormValues>) {
    let query = `${formValues.name} in:name`
    formValues.language && (query = `${query} language:${formValues.language}`)
    formValues.stars && (query = `${query} stars:>=${formValues.stars}`)

    return query
  }

  fetchRepositories(formValues: Partial<ReposSearchFormValues>): void {
    const params = new HttpParams()
      .set('q', this.buildSearchQuery(formValues))

    this.httpClient.get<RepositororiesSearchResponse>('https://api.github.com/search/repositories', { params })
      .subscribe({
        next: (data: RepositororiesSearchResponse) => this.repositories$.next(data.items)
      })
  }

  fetchRepositoriesByIssueTitleText(formValues: IssuesSearchFormValues) {
    const params = new HttpParams()
      .set('q', `${formValues.issueTitle} in:title type:issue`)

    this.httpClient.get<IssuesSearchResponse>('https://api.github.com/search/issues', { params })
      .pipe(
        mergeMap((data: IssuesSearchResponse) => data.items),
        concatMap((data) => this.httpClient.get<RepositororiesSearchResponse["items"][0]>(data.repository_url).pipe(delay(200))),
        toArray()
      )
      .subscribe({
        next: (data) => this.repositories$.next(data)
      })
  }
}

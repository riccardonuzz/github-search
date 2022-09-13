import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatAll, concatMap, delay, map, Subject, toArray } from 'rxjs';
import { ReposSearchFormValues } from './repos-search-form/repos-search-form.model';
import { IssuesSearchResponse, RepositororiesSearchResponse } from './repos.model';

@Injectable()
export class ReposService {
  repositories$ = new Subject<RepositororiesSearchResponse["items"]>()

  constructor(private httpClient: HttpClient) { }

  /**
 * @description build repositories search query basing on available fields
 */
  buildSearchQuery(formValues: Partial<ReposSearchFormValues>) {
    let query = `${formValues.name} in:name`
    formValues.language && (query = `${query} language:${formValues.language}`)
    formValues.stars && (query = `${query} stars:>=${formValues.stars}`)

    return query
  }

  /**
 * @description Fetch repositories that match specified conditions such as:
 * - Minimum number of stars
 * - Repository name
 * - Programming language
 */
  fetchRepositories(formValues: Partial<ReposSearchFormValues>): void {
    const params = new HttpParams()
      .set('q', this.buildSearchQuery(formValues))

    this.httpClient.get<RepositororiesSearchResponse>('https://api.github.com/search/repositories', { params })
      .subscribe({
        next: (data: RepositororiesSearchResponse) => this.repositories$.next(data.items)
      })
  }


  /**
  * @description Fetch repositories by issue title
  */
  fetchRepositoriesByIssueTitleText(issueTitle: string) {
    const params = new HttpParams()
      .set('q', `${issueTitle} in:title type:issue`)

    this.httpClient.get<IssuesSearchResponse>('https://api.github.com/search/issues', { params })
      .pipe(
        map(data => data.items),
        concatAll(),
        concatMap((data) => this.httpClient.get<RepositororiesSearchResponse["items"][0]>(data.repository_url).pipe(delay(200))),
        toArray()
      )
      .subscribe({
        next: data => this.repositories$.next(data)
      })
  }
}

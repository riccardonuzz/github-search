import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, concatMap, debounce, debounceTime, delay, flatMap, from, interval, map, mergeMap, of, Subject, switchMap, take, timer, toArray } from 'rxjs';
import { ReposSearchFormValues } from './repos-search-form/repos-search-form.model';

@Injectable()
export class ReposService {
  repositories$ = new Subject()

  constructor(private httpClient: HttpClient) { }

  buildSearchQuery(formValues: Partial<ReposSearchFormValues>) {
    let query = `${formValues.name} in:name`
    formValues.language && (query = `${query} language:${formValues.language}`)
    formValues.stars && (query = `${query} stars:${formValues.stars}`)

    return query
  }

  fetchRepositories(formValues: Partial<ReposSearchFormValues>) {
    const params = new HttpParams()
      .set('q', this.buildSearchQuery(formValues))

    this.httpClient.get('https://api.github.com/search/repositories', { params })
      .subscribe({
        next: data => this.repositories$.next(data)
      })
  }

  fetchRepositoriesByIssueTitleText(formValues: Partial<ReposSearchFormValues>) {
    const params = new HttpParams()
      .set('q', `${formValues.issueTitle} in:title type:issue`)

    this.httpClient.get('https://api.github.com/search/issues', { params })
      .pipe(
        mergeMap((data: any) => {
          return data.items
        }),
        concatMap((data: any) => {
          console.log('wait')
          return this.httpClient.get(data.repository_url).pipe(delay(1000))
        }),
        toArray()
      )
      .subscribe({
        next: data => this.repositories$.next(data)
      })
  }
}

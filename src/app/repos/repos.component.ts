import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IssuesSearchFormValues, ReposSearchFormValues } from './repos-search-form/repos-search-form.model';
import { RepositororiesSearchResponse } from './repos.model';
import { ReposService } from './repos.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReposComponent implements OnInit, OnDestroy {
  repositoriesSubscription: Subscription | null = null
  loading: boolean = false
  searched: boolean = false
  headers: Array<string> = [
    'Name',
    'Avatar',
    'Creation date'
  ]

  repositories: RepositororiesSearchResponse["items"] | null = null

  constructor(private reposService: ReposService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.repositoriesSubscription = this.reposService.repositories$.subscribe({
      next: (data: RepositororiesSearchResponse["items"]) => {
        this.repositories = data
        this.loading = false
        this.changeDetectorRef.detectChanges()
      }
    })
  }

  ngOnDestroy(): void {
    if (this.repositoriesSubscription) {
      this.repositoriesSubscription.unsubscribe()
    }
  }

  startLoading() {
    this.repositories = []
    this.loading = true
    this.searched = true
  }

  searchRepos(formValues: Partial<ReposSearchFormValues>) {
    this.startLoading()
    this.reposService.fetchRepositories(formValues)
  }

  searchReposByIssue(formValues: IssuesSearchFormValues) {
    if (formValues.issueTitle) {
      this.startLoading()
      this.reposService.fetchRepositoriesByIssueTitleText(formValues.issueTitle)
    }
  }
}

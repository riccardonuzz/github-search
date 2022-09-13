import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommitsSearchFormValues } from './commits-search-form/commits-search.model';
import { CommitsSearchResponse } from './commits.model';
import { CommitsService } from './commits.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss']
})
export class CommitsComponent implements OnInit {
  routeSubscription: Subscription | null = null
  commitsSubscription: Subscription | null = null
  loading: boolean = false
  searched: boolean = false
  headers: Array<string> = [
    'Commit author',
    'URL',
    'Commit message'
  ]
  commits: CommitsSearchResponse["items"] = []

  owner: string = ''
  repo: string = ''

  constructor(
    private commitsService: CommitsService,
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      this.owner = params['owner']
      this.repo = params['repo']
    })

    this.commitsSubscription = this.commitsService.commits$.subscribe({
      next: (data: CommitsSearchResponse["items"]) => {
        this.commits = data
        this.loading = false
        this.changeDetectorRef.detectChanges()
      }
    })
  }

  ngOnDestroy(): void {
    this.commitsSubscription && this.commitsSubscription.unsubscribe()
    this.routeSubscription && this.routeSubscription.unsubscribe()
  }

  startLoading(): void {
    this.commits = []
    this.loading = true
    this.searched = true
  }

  searchCommits(formValues: Partial<CommitsSearchFormValues>): void {
    this.startLoading()
    this.commitsService.fetchCommits(this.owner, this.repo, formValues)
  }
}

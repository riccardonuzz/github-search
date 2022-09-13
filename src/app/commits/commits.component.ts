import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommitsSearchResponse } from './commits.model';
import { CommitsService } from './commits.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss']
})
export class CommitsComponent implements OnInit {

  commitsSubscription: Subscription | null = null
  loading: boolean = false
  searched: boolean = false
  headers: Array<string> = [
    'Commit author',
    'URL',
    'Commit message'
  ]
  commits: CommitsSearchResponse["items"] = []

  constructor(private commitsService: CommitsService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.commitsSubscription = this.commitsService.commits$.subscribe({
      next: (data: CommitsSearchResponse["items"]) => {
        this.commits = data
        this.loading = false
        this.changeDetectorRef.detectChanges()
      }
    })
  }

  ngOnDestroy(): void {
    if (this.commitsSubscription) {
      this.commitsSubscription.unsubscribe()
    }
  }

  startLoading() {
    this.commits = []
    this.loading = true
    this.searched = true
  }

  // searchRepos(formValues: Partial<ReposSearchFormValues>) {
  //   this.startLoading()
  //   // this.commitsService.fetchCommits(formValues)
  // }
}

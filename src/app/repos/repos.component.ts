import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReposSearchFormValues } from './repos-search-form/repos-search-form.model';
import { ReposService } from './repos.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReposComponent implements OnInit, OnDestroy {
  repositoriesSubscription: Subscription | null = null
  headers: Array<string> = [
    'Nome',
    'Avatar',
    'Data creazione'
  ]

  repositories = []

  constructor(private reposService: ReposService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.repositoriesSubscription = this.reposService.repositories$.subscribe({
      next: (data: any) => {
        this.repositories = data.items
        this.changeDetectorRef.detectChanges()
      }
    })
  }

  ngOnDestroy(): void {
    if (this.repositoriesSubscription) {
      this.repositoriesSubscription.unsubscribe()
    }
  }

  searchRepos(formValues: Partial<ReposSearchFormValues>) {
    this.reposService.fetchRepositories(formValues)
  }


}

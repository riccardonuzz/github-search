import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsComponent } from './commits.component';
import { CommitsService } from './commits.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared/shared.module';
import { CommitsSearchFormComponent } from './commits-search-form/commits-search-form.component';
import { Subject } from 'rxjs';
import { CommitsSearchResponse } from './commits.model';
import { commitsMock } from 'src/test-helpers/mocks/commits.mock';
import { ChangeDetectorRef } from '@angular/core';

class MockedCommitsService {
  commits$ = new Subject<CommitsSearchResponse["items"]>()

  fetchCommits(owner: string, repo: string, text: string = '') {
    this.commits$.next(commitsMock.items as CommitsSearchResponse["items"])
  }
}


describe('CommitsComponent', () => {
  let component: CommitsComponent;
  let fixture: ComponentFixture<CommitsComponent>;
  let changeDetector: ChangeDetectorRef

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CommitsComponent,
        CommitsSearchFormComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        CommitsService,
        { provide: CommitsService, useClass: MockedCommitsService }
      ]
    })
      .compileComponents()

    fixture = TestBed.createComponent(CommitsComponent)
    component = fixture.componentInstance
    changeDetector = fixture.componentRef.injector.get(ChangeDetectorRef)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should correctly show form', () => {
    const form: HTMLFormElement = fixture.nativeElement.querySelector('form')
    expect(form).toBeTruthy()
  })

  it('should show data in table when submitting form', () => {
    component.owner = 'react'
    component.repo = 'react'
    const form: HTMLFormElement = fixture.nativeElement.querySelector('form')
    const input: HTMLInputElement | null = form.querySelector('input')

    if (input) {
      input.value = 'commit1'
      input.dispatchEvent(new Event('input'))
      form.dispatchEvent(new Event('submit'))

      fixture.detectChanges()
      changeDetector.detectChanges()


      const table: HTMLElement = fixture.nativeElement.querySelector('app-table')
      expect(table).toBeTruthy()
      expect(table.querySelectorAll('tbody > tr').length).toEqual(3)
    }

  })
})

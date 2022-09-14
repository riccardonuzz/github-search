import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ReposSearchFormComponent } from './repos-search-form.component';

describe('ReposSearchFormComponent', () => {
  let component: ReposSearchFormComponent
  let fixture: ComponentFixture<ReposSearchFormComponent>
  let changeDetector: ChangeDetectorRef

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReposSearchFormComponent],
      imports: [
        ReactiveFormsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReposSearchFormComponent);
    changeDetector = fixture.componentRef.injector.get(ChangeDetectorRef)
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render first form inputs and button', () => {
    const forms: NodeListOf<HTMLFormElement> = fixture.nativeElement.querySelectorAll('form')
    const inputs: NodeListOf<HTMLInputElement> = forms[0].querySelectorAll('input')
    const button: HTMLButtonElement | null = forms[0].querySelector('button')

    expect(button).toBeTruthy()
    expect(button?.disabled).toBeTruthy()
    expect(forms.length).toEqual(2)
    expect(inputs.length).toEqual(3)
  })

  it('should render second form inputs and button', () => {
    const forms: NodeListOf<HTMLFormElement> = fixture.nativeElement.querySelectorAll('form')
    const inputs: NodeListOf<HTMLInputElement> = forms[1].querySelectorAll('input')
    const button: HTMLButtonElement | null = forms[1].querySelector('button')

    expect(button).toBeTruthy()
    expect(button?.disabled).toBeTruthy()
    expect(inputs.length).toEqual(1)
  })

  it('should enable button when first form name field is NOT empty', () => {
    const forms: NodeListOf<HTMLFormElement> = fixture.nativeElement.querySelectorAll('form')
    const nameInput: HTMLInputElement = forms[0].querySelectorAll('input')[0]
    const button: HTMLButtonElement | null = forms[0].querySelector('button')

    nameInput.value = 'react'
    nameInput.dispatchEvent(new Event('input'))
    changeDetector.detectChanges()

    expect(component.reposSearchForm.value.name).toEqual('react')
    expect(button?.disabled).toBeFalse()
  })

  it('should enable button when first form issue title field is NOT empty', () => {
    const forms: NodeListOf<HTMLFormElement> = fixture.nativeElement.querySelectorAll('form')

    const issueTitleInput: HTMLInputElement | null = forms[1].querySelector('input')
    const button: HTMLButtonElement | null = forms[1].querySelector('button')

    if (issueTitleInput) {
      issueTitleInput.value = 'issue1'
      issueTitleInput.dispatchEvent(new Event('input'))
      changeDetector.detectChanges()

      expect(component.issueSearchForm.value.issueTitle).toEqual('issue1')
      expect(button?.disabled).toBeFalse()
    }
  })

  it('should first form emit event when submitted', () => {
    spyOn(component.reposSubmitForm, 'emit');

    const forms: NodeListOf<HTMLFormElement> = fixture.nativeElement.querySelectorAll('form')

    const issueTitleInput: HTMLInputElement | null = forms[0].querySelectorAll('input')[0]

    if (issueTitleInput) {
      issueTitleInput.value = 'react'
      issueTitleInput.dispatchEvent(new Event('input'))
      changeDetector.detectChanges()
      forms[0].dispatchEvent(new Event('submit'))

      expect(component.reposSubmitForm.emit).toHaveBeenCalled();
    }

  })


  it('should second form emit event when submitted', () => {
    spyOn(component.issuesSubmitForm, 'emit');

    const forms: NodeListOf<HTMLFormElement> = fixture.nativeElement.querySelectorAll('form')

    const issueTitleInput: HTMLInputElement | null = forms[1].querySelector('input')

    if (issueTitleInput) {
      issueTitleInput.value = 'issue1'
      issueTitleInput.dispatchEvent(new Event('input'))
      changeDetector.detectChanges()
      forms[1].dispatchEvent(new Event('submit'))

      expect(component.issuesSubmitForm.emit).toHaveBeenCalled();
    }

  })

})

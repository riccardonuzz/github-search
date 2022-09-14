import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CommitsSearchFormComponent } from './commits-search-form.component';

describe('CommitsSearchFormComponent', () => {
  let component: CommitsSearchFormComponent;
  let fixture: ComponentFixture<CommitsSearchFormComponent>;
  let changeDetector: ChangeDetectorRef

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CommitsSearchFormComponent
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitsSearchFormComponent);
    component = fixture.componentInstance;
    changeDetector = fixture.componentRef.injector.get(ChangeDetectorRef)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render text input', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input')
    expect(fixture.nativeElement.querySelector('input')).toBeTruthy()
  })

  it('should render a disabled button', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button')
    expect(button).toBeTruthy()
    expect(button.disabled).toBeTruthy()
  })

  it('should enable button when input is NOT empty', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input')
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button')
    
    input.value = 'commit1'
    input.dispatchEvent(new Event('input'))
    changeDetector.detectChanges()
    
    expect(component.commitsSearchForm.value.text).toEqual('commit1')
    expect(button.disabled).toBeFalse()

  })

  it('should emit event when submitted', () => {
    spyOn(component.commitsSubmitForm, 'emit');

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input')
    const form: HTMLButtonElement = fixture.nativeElement.querySelector('form')

    input.value = 'commit1'
    input.dispatchEvent(new Event('input'))
    form.dispatchEvent(new Event('submit'))
    
    expect(component.commitsSubmitForm.emit).toHaveBeenCalled();
  })
});

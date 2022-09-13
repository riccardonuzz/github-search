import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsSearchFormComponent } from './commits-search-form.component';

describe('CommitsSearchFormComponent', () => {
  let component: CommitsSearchFormComponent;
  let fixture: ComponentFixture<CommitsSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitsSearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitsSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

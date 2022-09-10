import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposSearchFormComponent } from './repos-search-form.component';

describe('ReposSearchFormComponent', () => {
  let component: ReposSearchFormComponent;
  let fixture: ComponentFixture<ReposSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReposSearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReposSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

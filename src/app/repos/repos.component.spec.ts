import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../shared/shared.module';
import { ReposSearchFormComponent } from './repos-search-form/repos-search-form.component';

import { ReposComponent } from './repos.component';
import { ReposService } from './repos.service';

describe('ReposComponent', () => {
  let component: ReposComponent;
  let fixture: ComponentFixture<ReposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ReposComponent,
        ReposSearchFormComponent
      ],
      imports: [
        HttpClientTestingModule,
        SharedModule
      ],
      providers: [
        ReposService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

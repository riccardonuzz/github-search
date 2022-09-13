import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { commitsMock } from 'src/test-helpers/commits.mock';

import { CommitsService } from './commits.service';

describe('CommitsService', () => {
  let service: CommitsService;
  let mockedHttpClient: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [CommitsService]
    });

    service = TestBed.inject(CommitsService);
    mockedHttpClient = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch commits', () => {
    service.fetchCommits('example', 'example', 'test')
    service.commits$.subscribe(data => expect(data.length).toEqual(3))

    const req = mockedHttpClient.expectOne("https://api.github.com/search/commits?q=test%20repo:example/example");
    expect(req.request.method).toBe("GET");
    req.flush(commitsMock);
  })


  it('should fetch commits if no text provided', () => {
    service.fetchCommits('example', 'example')
    service.commits$.subscribe(data => expect(data.length).toEqual(3))

    const req = mockedHttpClient.expectOne("https://api.github.com/search/commits?q=repo:example/example");
    expect(req.request.method).toBe("GET");
    req.flush(commitsMock);
  })

  
});

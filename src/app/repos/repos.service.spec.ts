import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { issuesMock, issuesRepositoriesMock } from 'src/test-helpers/mocks/issues.mock';
import { repositoriesMock } from 'src/test-helpers/mocks/repositories.mock';

import { ReposService } from './repos.service';

describe('ReposService', () => {
  let service: ReposService
  let mockedHttpClient: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [ReposService]
    })
    mockedHttpClient = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ReposService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })


  it('should fetch repositories', () => {
    const formData = {
      name: 'example',
      language: 'example',
      stars: 5
    }

    service.fetchRepositories(formData)
    service.repositories$.subscribe(data => expect(data.length).toEqual(3))

    const req = mockedHttpClient.expectOne(`https://api.github.com/search/repositories?q=${formData.name}%20in:name%20language:${formData.language}%20stars:%3E=${formData.stars}`);
    expect(req.request.method).toBe("GET");
    req.flush(repositoriesMock);
  })


  it('should fetch repositories by issue title', fakeAsync(() => {
    const issueTitle = 'example issue'
    service.fetchRepositoriesByIssueTitleText(issueTitle)
    service.repositories$.subscribe(data => expect(data.length).toBe(3))

    const issuesRequest = mockedHttpClient.expectOne(`https://api.github.com/search/issues?q=example%20issue%20in:title%20type:issue`);
    expect(issuesRequest.request.method).toBe("GET");
    issuesRequest.flush(issuesMock);

    const req1 = mockedHttpClient
      .expectOne(`https://api.github.com/repos/stryker-mutator/stryker-js`)
    req1.flush(issuesRepositoriesMock[0]);

    tick(200);

    const req2 = mockedHttpClient
      .expectOne(`https://api.github.com/repos/nagybnc/weather-app`)
    req2.flush(issuesRepositoriesMock[1]);

    tick(200);

    const req3 = mockedHttpClient
      .expectOne(`https://api.github.com/repos/elastic/kibana`)
    req3.flush(issuesRepositoriesMock[2]);

    tick(200);


    // discardPeriodicTasks()
  }))


})

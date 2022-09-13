import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { repositoriesMock } from 'src/test-helpers/repositories.mock';

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
})

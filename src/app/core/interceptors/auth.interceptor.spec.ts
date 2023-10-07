import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../environments/environment";

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add authorId header to all requests', () => {
    const testData = { data: 'testData' };

    http.get('/api/test').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne('/api/test');
    expect(httpRequest.request.headers.has('authorId')).toEqual(true);
    expect(httpRequest.request.headers.get('authorId')).toBe(environment.authorId);

    httpRequest.flush(testData);
  });
});

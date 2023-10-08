import { TestBed } from '@angular/core/testing';
import { HttpEvent, HttpRequest, HttpResponse, HttpHandler } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { HttpLoaderInterceptor } from './http-loader.interceptor';
import { of } from 'rxjs';

describe('HttpLoaderInterceptor', () => {
  let interceptor: HttpLoaderInterceptor;
  let loaderService: LoaderService;
  let httpHandler: HttpHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpLoaderInterceptor,
        { provide: LoaderService, useValue: { show: jest.fn(), hide: jest.fn() } },
        { provide: HttpHandler, useValue: { handle: jest.fn() } },
      ],
    });

    interceptor = TestBed.inject(HttpLoaderInterceptor);
    loaderService = TestBed.inject(LoaderService);
    httpHandler = TestBed.inject(HttpHandler);
  });


  it('should hide loader after request completion', () => {
    jest.spyOn(httpHandler, 'handle').mockReturnValue(of(new HttpResponse()));

    interceptor.intercept(new HttpRequest('GET', 'https://test.com'), httpHandler).subscribe();

    expect(loaderService.hide).toHaveBeenCalled();
  });

});

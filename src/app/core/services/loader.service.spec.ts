import { TestBed } from '@angular/core/testing';
import {LoaderService} from "./loader.service";

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should set isLoading to true after calling show', () => {
    service.show();
    jest.runAllTimers();
    expect(service.isLoading.value).toBe(true);
  });



  it('should set isLoading to false after calling hide', () => {
    service.hide();
    jest.runAllTimers();
    expect(service.isLoading.value).toBe(false);
  });

});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBarComponent]
    });
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search term when input keyup event is triggered', () => {
    jest.spyOn(component.SearchTerm, 'emit');

    const inputElement = fixture.debugElement.nativeElement.querySelector('input');
    inputElement.value = 'testSearch';
    inputElement.dispatchEvent(new Event('keyup'));

    expect(component.SearchTerm.emit).toHaveBeenCalledWith('testSearch');
  });
});

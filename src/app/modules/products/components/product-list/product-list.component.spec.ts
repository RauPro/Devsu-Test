import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ProductListComponent } from './product-list.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService: any;

  beforeEach(() => {
    mockProductService = {
      getAllProducts: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [{ provide: ProductService, useValue: mockProductService }],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load products on initialization', () => {
    const products = [
      { id: '1', name: 'Product A' },
      { id: '2', name: 'Product B' }
    ];

    mockProductService.getAllProducts.mockReturnValue(of(products));
    component.ngOnInit();

    expect(component.products).toEqual(products);
    expect(component.originalProducts).toEqual(products);
  });
  it('should filter products based on search term', done => {
    const products = [
      { id: '1', name: 'Product A' },
      { id: '2', name: 'Product B' }
    ];
    const searchTerm = 'A';

    mockProductService.getAllProducts.mockReturnValue(of(products));
    component.ngOnInit();

    component.handleSearch(searchTerm);

    setTimeout(() => {
      expect(component.products).toEqual([{ id: '1', name: 'Product A' }]);
      done();
    }, 2500);
  });
  it('should reset products when search term is empty', done => {
    const products = [
      { id: '1', name: 'Product A' },
      { id: '2', name: 'Product B' }
    ];

    mockProductService.getAllProducts.mockReturnValue(of(products));
    component.ngOnInit();

    component.handleSearch('');

    setTimeout(() => {
      expect(component.products).toEqual(products);
      done();
    }, 2500);
  });


});

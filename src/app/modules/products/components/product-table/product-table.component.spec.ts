import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProductTableComponent } from './product-table.component';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import {IProduct} from "../../models/product.model";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('ProductTableComponent', () => {
  let component: ProductTableComponent;
  let fixture: ComponentFixture<ProductTableComponent>;
  let mockProductService: any;
  let mockRouter: any;
  const product: IProduct = {
    id: '1',
    name: 'Product Test',
    description: 'Description 1',
    logo: 'Logo 1',
    date_release: '2021-01-01',
    date_revision: '2021-12-31'
  };
  beforeEach(() => {
    mockProductService = {
      createProduct: jest.fn(),
      deleteProduct: jest.fn(),
      updateProduct: jest.fn()
    };
    mockRouter = {
      navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [ProductTableComponent],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(ProductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should paginate products on ngOnChanges', () => {
    component.products = Array(10).fill({}).map((_, idx) => ({
      id: idx.toString(),
      name: `Product ${idx}`,
      description: `Description ${idx}`,
      logo: `Logo ${idx}`,
      date_release: '2021-01-01',
      date_revision: '2021-12-31'
    }));

    component.ngOnChanges();
    expect(component.paginatedProducts.length).toBe(component.itemsPerPage);
  });

  it('should go to the next page', () => {
    component.currentPage = 1;
    component.goToNextPage();
    expect(component.currentPage).toBe(2);
  });

  it('should go to the previous page', () => {
    component.currentPage = 2;
    component.goToPreviousPage();
    expect(component.currentPage).toBe(1);
  });

  it('should reset to the first page', () => {
    component.currentPage = 3;
    component.goToFirstPage();
    expect(component.currentPage).toBe(1);
  });

  it('should go to the last page', () => {
    component.goToLastPage();
    expect(component.currentPage).toBe(component.totalPages);
  });

  it('should call handleCancelButton', () => {
    component.handleCancelButton();
    expect(component.showDeleteModal).toBeFalsy();
  });

  it('should detect the first page', () => {
    component.currentPage = 1;
    expect(component.isFirstPage()).toBe(true);
  });

  it('should detect the last page', () => {
    component.currentPage = component.totalPages;
    expect(component.isLastPage()).toBe(true);
  });

  it('should toggle the menu', () => {
    const productId = '1';
    component.toggleMenu(productId);
    expect(component.openedMenuId).toBe(productId);
    component.toggleMenu(productId);
    expect(component.openedMenuId).toBe(null);
  });

  it('should handle item deletion', () => {
    component.deleteItem(product);
    expect(component.currentSelectedProduct).toEqual(product);
    expect(component.showDeleteModal).toBe(true);
  });

  it('should handle delete button action', () => {
    mockProductService.deleteProduct.mockReturnValue(of(null));
    component.products = [product];
    component.currentSelectedProduct = product;
    component.handleDeleteButton();
    expect(component.products).not.toContain(product);
  });

  it('should navigate to edit item page', () => {
    component.editItem(product);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/form-product'], { state: { data: product } });
  });
  it('should return delete message based on current product', () => {
    component.currentSelectedProduct = product;
    expect(component.deleteMessage).toBe(`¿Estas seguro deseas eliminar el producto ${product.name}?`);
  });

});

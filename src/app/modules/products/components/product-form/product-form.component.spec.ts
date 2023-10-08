import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';


// Mock del router
const mockRouter = {
  navigate: jest.fn(),
};
const mockProductService = {
  createProduct: jest.fn().mockReturnValue(of({})),
  updateProduct: jest.fn().mockReturnValue(of({}))
};


describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProductFormComponent],
      providers: [
        FormBuilder,
        { provide: ProductService, useValue: mockProductService },
        { provide: Router, useValue: mockRouter }
      ]
    })
      .compileComponents();
    Object.defineProperty(window, 'history', {
      value: {
        state: {
          data: {
            id: 'testId',
            name: 'testName',
            description: 'testDescription',
            logo: 'testLogo',
            date_release: '2022-01-01T12:00:00Z',
            date_revision: '2023-01-01T12:00:00Z'
          }
        }
      }
    });
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /products when handleButton is called', () => {
    component.handleButton();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });


  it('should process data from window.history.state.data on initialization', () => {
    expect(component.productForm.get('id')?.value).toBe('testId');
    expect(component.productForm.get('name')?.value).toBe('testName');
  });

  it('should call updateProduct when modifying an existing product', () => {
    component.isModified = true;
    component.productForm.setValue({
      id: 'testId',
      name: 'testName',
      description: 'testDescription',
      logo: 'testLogo',
      date_release: '2022-01-01',
      date_revision: '2023-01-01'
    });

    component.submit();
    expect(mockProductService.updateProduct).toHaveBeenCalledWith({
      id: 'testId',
      name: 'testName',
      description: 'testDescription',
      logo: 'testLogo',
      date_release: '2022-01-01',
      date_revision: '2023-01-01'
    });
  });

  it('should navigate to /products when handleButton is called', () => {
    component.handleButton();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should return false if all controls are valid in validControls', () => {
    expect(component.validControls()).toBeFalsy();
  });
  it('should handle successful request', () => {
    const mockProduct = {};  // Usa un objeto de mock que represente un producto válido
    component.isModified = false;

    mockProductService.createProduct.mockReturnValue(of(mockProduct));

    component.submit();

    expect(component.showSuccessModal).toBeTruthy();
  });

  it('should handle failed request', () => {
    const errorResponse = { message: 'Error from server' };
    mockProductService.createProduct.mockReturnValue(throwError(errorResponse));
    component.isModified = false;
    component.submit();
    expect(component.isModified).toBeFalsy();
  });


  it('should reset form on successful creation', () => {
    mockProductService.createProduct.mockReturnValue(of({  }));

    const resetSpy = jest.spyOn(component, 'reset');

    component['isModified'] = false;

    component.submit();

    expect(resetSpy).toHaveBeenCalled();
  });

  it('should not reset form on successful update', () => {
    const mockProduct = {};
    component.isModified = true;

    mockProductService.createProduct.mockReturnValue(of(mockProduct));
    const resetSpy = jest.spyOn(component, 'reset');

    component.submit();

    expect(resetSpy).not.toHaveBeenCalled();
  });
  it('should return true if any control is invalid', () => {
    component.ngOnInit();

    component.productForm.get('name')?.setErrors({ 'required': true })
    component.productForm.updateValueAndValidity();

    expect(component.validControls()).toBeTruthy();
  });


});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { IProduct } from '../models/product.model';
import {ProductService} from "./product.service";

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;
  const BASE_URL = environment.baseUrl;
  const PRODUCTS_ENDPOINT = `${BASE_URL}/bp/products`;
  const mockProduct: IProduct = {
    id: '1',
    name: 'Product Test',
    description: 'Description 1',
    logo: 'Logo 1',
    date_release: '2021-01-01',
    date_revision: '2021-12-31'
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifies that no requests are outstanding.
  });

  it('should fetch all products', () => {
    const mockProducts: IProduct[] = [{ ...mockProduct }];

    service.getAllProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne(PRODUCTS_ENDPOINT);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProducts);
  });

  it('should create a product', () => {

    service.createProduct(mockProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpTestingController.expectOne(PRODUCTS_ENDPOINT);
    expect(req.request.method).toEqual('POST');
    req.flush(mockProduct);
  });

  it('should update a product', () => {

    service.updateProduct(mockProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpTestingController.expectOne(`${PRODUCTS_ENDPOINT}/`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockProduct);
  });

  it('should delete a product', () => {
    const productId = '1';

    service.deleteProduct(productId).subscribe();

    const req = httpTestingController.expectOne(`${PRODUCTS_ENDPOINT}?id=${productId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });

  it('should check if product exists', () => {
    const productId = '1';
    const doesExist = true;

    service.existProduct(productId).subscribe(result => {
      expect(result).toEqual(doesExist);
    });

    const req = httpTestingController.expectOne(`${PRODUCTS_ENDPOINT}/verification?id=${productId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(doesExist);
  });
});

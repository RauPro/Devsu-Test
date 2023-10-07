import {of, BehaviorSubject, Observable} from 'rxjs';
import { ProductService } from '../services/product.service';
import { existingIDValidator } from './id-validator';
describe('existingIDValidator', () => {
  let productService: Partial<ProductService>;
  let mockControl: { valueChanges: BehaviorSubject<any> };

  beforeEach(() => {
    productService = {
      existProduct: jest.fn()
    };

    mockControl = { valueChanges: new BehaviorSubject(null) };
  });

  it('should validate correctly', done => {
    (productService.existProduct as jest.Mock).mockReturnValueOnce(of(true));

    const validator = existingIDValidator(productService as ProductService);
    const validationObservable = validator(mockControl as any) as Observable<any>;

    mockControl.valueChanges.next('1234');

    validationObservable.subscribe(result => {
      expect(result).toEqual({ idExists: true });
      done();
    });
  });
  it('should handle errors and return null', done => {
    (productService.existProduct as jest.Mock).mockReturnValueOnce(new Observable(observer => {
      observer.error(new Error('Fake error'));
    }));

    const validator = existingIDValidator(productService as ProductService);
    const validationObservable = validator(mockControl as any) as Observable<any>;
    mockControl.valueChanges.next('1234');  // Simulamos un cambio de valor
    validationObservable.subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });

  it('should return null when productService.existProduct returns false', done => {
    (productService.existProduct as jest.Mock).mockReturnValueOnce(of(false));

    const validator = existingIDValidator(productService as ProductService);
    const validationObservable = validator(mockControl as any) as Observable<any>;

    mockControl.valueChanges.next('1234');

    validationObservable.subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });
});

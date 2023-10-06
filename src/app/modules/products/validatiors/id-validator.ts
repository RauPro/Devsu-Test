import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import {Observable, of, switchMap, take} from 'rxjs';
import {map, catchError, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ProductService} from "../services/product.service";

export function existingIDValidator(productService: ProductService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return control.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      take(1),  // <-- Just take one value from the stream.
      switchMap(value =>
        productService.existProduct(value).pipe(
          map(idExists => idExists ? { idExists: true } : null),
          catchError(() => of(null))
        )
      )
    );
  };
}


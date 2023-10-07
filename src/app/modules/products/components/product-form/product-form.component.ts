import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {existingIDValidator} from "../../validatiors/id-validator";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {IProduct} from "../../models/product.model";
import {catchError, takeUntil} from "rxjs/operators";
import {of, Subject} from "rxjs";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  private isModified: boolean = false;
  private destroy$ = new Subject<void>();
  showSuccessModal: boolean = false;
  productForm: FormGroup;
  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) {
    const currentDate = new Date();
    const nextYearDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));

    this.productForm = this.fb.group({
      id: ['', [Validators.required,], [existingIDValidator(productService)]],
      name: ['', Validators.required],
      description: ['', Validators.required],
      logo: ['', Validators.required],
      date_release: ['', Validators.required],
      date_revision: [
        {
          value: nextYearDate.toISOString().split('T')[0], // Convierte la fecha a formato "YYYY-MM-DD"
          disabled: true,
        },
        Validators.required,
      ]
    });
  }

  ngOnInit(): void {
    const data: IProduct = window.history.state.data;
    if (data) {
      this.isModified = true;
      data.date_release = data.date_release.split('T')[0];
      data.date_revision = data.date_revision.split('T')[0];
      this.productForm.patchValue(data);
      this.productForm.get('id')?.disable();
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  submit(): void {
    if (this.productForm.valid) {
      const values = this.productForm.getRawValue();
      const request$ = this.isModified ?
        this.productService.updateProduct(values) :
        this.productService.createProduct(values);

      request$.pipe(
        catchError(error => {
          console.error("There was an error!", error);
          return of(null);  // handle error gracefully
        }),
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.showSuccessModal = true;
        if (!this.isModified) {
          this.reset();
        }
      });
    }
  }

  reset() {
    this.productForm.reset({
      date_revision: this.productForm.get('date_revision')?.value
    });
  }

  validControls() {
    // Validate if controls are valid
    let invalidControl = false;
    for (let control in this.productForm.controls) {
      if (this.productForm.controls[control].status === "INVALID") {
        invalidControl = true;
      }
    }
    return invalidControl
  }

  handleButton() {
    this.router.navigate(['/products']);
  }
}



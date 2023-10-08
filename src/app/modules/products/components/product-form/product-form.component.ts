import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {existingIDValidator} from "../../validatiors/id-validator";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {IProduct} from "../../models/product.model";
import {catchError, takeUntil} from "rxjs/operators";
import {of, Subject} from "rxjs";
import {futureDateValidator} from "../../validatiors/custom-date.validator";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  isModified: boolean = false;
  private destroy$ = new Subject<void>();
  showSuccessModal: boolean = false;
  productForm: FormGroup;
  modalMessage: string = "";
  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) {
    this.productForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [existingIDValidator(productService)]],
      name: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(100)] ],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required, futureDateValidator()]],
      date_revision: [
        {
          value: "",
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
    this.modalMessage = this.isModified ? 'Producto modificado con éxito' : 'Producto creado con éxito';
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
          //console.error("There was an error!", error);
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
    if (this.isModified) {
      this.productForm.reset({
        id: this.productForm.get('id')?.value,
        date_revision: this.productForm.get('date_revision')?.value
      });
    }else{
      this.productForm.reset({
        date_revision: this.productForm.get('date_revision')?.value
      });
    }
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
    this.router.navigate(['/']);
  }

  valuesChange() {
    const currentDate = new Date(this.productForm.get('date_release')?.value);
    const nextYearDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
    this.productForm.get('date_revision')?.patchValue(nextYearDate.toISOString().split('T')[0]);
  }
}



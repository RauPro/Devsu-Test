import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {existingIDValidator} from "../../validatiors/id-validator";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {IProduct} from "../../models/product.model";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  productForm: FormGroup;
  isModified: boolean = false;
  showSuccessModal: boolean = false;

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
      console.log(data)
      this.productForm.patchValue(data);
      this.productForm.get('id')?.disable();
    }
  }

  submit() {
    if (this.productForm.valid) {
      console.log(this.productForm.value)
      const values = this.productForm.getRawValue();
      if (this.isModified) {
        this.productService.updateProduct(values).subscribe(() => {
          this.showSuccessModal = true;

        });
      } else {
        this.productService.createProduct(values).subscribe((product) => {
          this.showSuccessModal = true;
          this.reset()
        })
      }
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



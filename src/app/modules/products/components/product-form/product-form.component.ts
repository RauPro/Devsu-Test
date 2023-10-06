import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {existingIDValidator} from "../../validatiors/id-validator";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    const currentDate = new Date();
    const nextYearDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));

    this.productForm = this.fb.group({
      id: ['', [Validators.required, ], [existingIDValidator(productService)]],
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
    console.log(this.productForm.pending)
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.productForm.get('id'));
    console.log(this.productForm.get('name'));
    if (this.productForm.valid) {
      const values = this.productForm.value;
      // Hacer algo con los valores, como enviarlos a un servicio
    } else {
      // Manejar el error o mostrar un mensaje
    }
  }

  reset() {
    this.productForm.reset({
      date_revision: this.productForm.get('date_revision')?.value
    });
  }
  validControls(){
    // Validate if controls are valid
    let invalidControl = false;
    for (let control in this.productForm.controls) {
      if (this.productForm.controls[control].status === "INVALID"){
        invalidControl = true;
      }
    }
    return invalidControl
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    const currentDate = new Date();
    const nextYearDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));

    this.productForm = this.fb.group({
      id: ['', [Validators.required,]],
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
    console.log(this.productForm.value)
  }

  submit() {
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
}

import {Component, Input} from '@angular/core';
import {IProduct} from "../../models/product.model";

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent {
  @Input() products: IProduct[] = [];
}

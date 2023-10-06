import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../models/product.model";
import {environment} from "../../../../../environments/environment";
import {ProductService} from "../../services/product.service";
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})


export class ProductListComponent implements OnInit{
  products: IProduct[] = [];
  originalProducts: IProduct[] = [];
  private searchSubject = new Subject<string>();

  constructor(private productService: ProductService) {
  }
  ngOnInit(): void {
    console.log(environment.baseUrl);
    this.productService.getAllProducts().subscribe((products) => {
      console.log(products);
      this.products = products;
      this.originalProducts = products;
    })
    this.searchSubject.pipe(
      debounceTime(2000), // 2 seconds -- to save resources
      distinctUntilChanged() // if value changes
    ).subscribe(term => {
      console.log(term)
      if (term != ""){
        this.products = this.products.filter(product => product.name.includes(term));
      }
      else {
        this.products = this.originalProducts;
      }
    });
  }
  handleSearch(term: string) {
    this.searchSubject.next(term);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from "../../models/product.model";
import { ProductService } from "../../services/product.service";
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  originalProducts: IProduct[] = [];
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.products = products;
        this.originalProducts = products;
      });

    this.searchSubject.pipe(
      debounceTime(1000), // Wait 1 seconds after the last event before emitting last event
      distinctUntilChanged(), // Only emit if value is different from previous value
      takeUntil(this.destroy$)
    ).subscribe(term => {
      if (term.trim() !== "") {
        this.products = this.originalProducts.filter(product => product.name.toLowerCase().includes(term.toLowerCase()));
      } else {
        this.products = [...this.originalProducts];
      }
    });
  }

  handleSearch(term: string) {
    this.searchSubject.next(term);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

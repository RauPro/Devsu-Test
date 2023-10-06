import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {IProduct} from "../../models/product.model";

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnChanges{
  @Input() products: IProduct[] = [];
  itemsPerPageOptions = [5, 10, 15];
  itemsPerPage = this.itemsPerPageOptions[0]; // Show 5 by default
  currentPage = 1;
  totalPages = 0;
  paginatedProducts: IProduct[] = [];

  ngOnChanges(): void {
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.paginatedProducts = this.products.slice(0, this.itemsPerPage);
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    this.paginate();
  }

  paginate() {
    const startItem = (this.currentPage - 1) * this.itemsPerPage;
    const endItem = this.currentPage * this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startItem, endItem);
  }
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  goToFirstPage() {
    this.currentPage = 1;
    this.paginate();
  }

  goToLastPage() {
    this.currentPage = this.totalPages;
    this.paginate();
  }



}

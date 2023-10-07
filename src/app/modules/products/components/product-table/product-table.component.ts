import { Component, Input, OnChanges } from '@angular/core';
import { IProduct } from "../../models/product.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnChanges {
  @Input() products: IProduct[] = [];
  itemsPerPageOptions = [5, 10, 15];
  itemsPerPage = this.itemsPerPageOptions[0];
  openedMenuId: string | null = null;
  private _currentPage = 1;
  constructor(private router: Router) {
  }
  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(page: number) {
    this._currentPage = page;
    this.paginate();
  }

  totalPages = 0;
  paginatedProducts: IProduct[] = [];

  ngOnChanges(): void {
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.paginate();
  }

  updatePagination() {
    console.log("UPDATE")
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    this.paginate();
  }

  paginate() {
    const startItem = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startItem, startItem + this.itemsPerPage);
  }

  goToNextPage() {
    if (!this.isLastPage()) {
      this.currentPage++;
    }
  }

  goToPreviousPage() {
    if (!this.isFirstPage()) {
      this.currentPage--;
    }
  }

  goToFirstPage() {
    this.currentPage = 1;
  }

  goToLastPage() {
    this.currentPage = this.totalPages;
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }
  toggleMenu(id: string) {
    this.openedMenuId = this.openedMenuId === id ? null : id;
  }

  editItem(product: IProduct) {
    this.router.navigate(['/form-product'], { state: { data: product } });
  }

  deleteItem() {
    // Lógica de eliminación
    //this.isMenuOpen = false;
  }

}

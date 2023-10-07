import { Component, Input, OnChanges } from '@angular/core';
import { IProduct } from "../../models/product.model";
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";

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
  currentSelectedProduct: IProduct | null = null;
  private _currentPage = 1;
  constructor(private router: Router, private productService: ProductService) {
  }
  get currentPage(): number {
    return this._currentPage;
  }
  get deleteMessage(): string {
    return `¿Estas seguro deseas eliminar el producto ${this.currentSelectedProduct?.name}?`;
  }

  set currentPage(page: number) {
    this._currentPage = page;
    this.paginate();
  }

  totalPages = 0;
  paginatedProducts: IProduct[] = [];
  showDeleteModal: boolean = false;

  ngOnChanges(): void {
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.paginate();
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

  deleteItem(product: IProduct) {
    this.currentSelectedProduct = product;
    this.showDeleteModal = true;
    this.openedMenuId = null;
  }

  handleCancelButton() {
    this.showDeleteModal = false;
  }

  handleDeleteButton() {
    if (this.currentSelectedProduct?.id){
      this.productService.deleteProduct(this.currentSelectedProduct.id).subscribe(() => {
        this.products = this.products.filter(product => product.id !== this.currentSelectedProduct?.id);
        this.updatePagination();
        this.showDeleteModal = false;
      })
    }
  }
}

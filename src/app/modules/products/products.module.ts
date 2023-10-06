import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import {RouterModule} from "@angular/router";
import routes from "./products.routes";
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import {HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ProductListComponent,
    SearchBarComponent,
    ProductTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  providers: [ProductService],
  exports: [RouterModule]

})
export class ProductsModule { }

import {Routes} from "@angular/router";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductFormComponent} from "./components/product-form/product-form.component";

const routes: Routes = [
  {
    path: "",
    component: ProductListComponent
  },
  {
    path: "form-product",
    component: ProductFormComponent
  }
]
export default routes;

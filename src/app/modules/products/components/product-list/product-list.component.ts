import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../models/product.model";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{

  PRODUCTS_MOCK: IProduct[] = [
    {
      id: "1",
      name: "Producto A",
      description: "Descripción detallada del Producto A.",
      logo: "ruta/a/logoA.png",
      date_release: "01/01/2020",
      date_revision: "01/01/2021"
    },
    {
      id: "2",
      name: "Producto B",
      description: "Descripción detallada del Producto B.",
      logo: "ruta/a/logoB.png",
      date_release: "02/02/2020",
      date_revision: "02/02/2021"
    },
    {
      id: "3",
      name: "Producto C",
      description: "Descripción detallada del Producto C.",
      logo: "ruta/a/logoC.png",
      date_release: "03/03/2020",
      date_revision: "03/03/2021"
    },
    {
      id: "4",
      name: "Producto D",
      description: "Descripción detallada del Producto D.",
      logo: "ruta/a/logoD.png",
      date_release: "04/04/2020",
      date_revision: "04/04/2021"
    },
    {
      id: "5",
      name: "Producto E",
      description: "Descripción detallada del Producto E.",
      logo: "ruta/a/logoE.png",
      date_release: "05/05/2020",
      date_revision: "05/05/2021"
    }
  ];
  ngOnInit(): void {
    console.log(environment.baseUrl);
  }
  handleSearch(term: string) {
    // TODO: PI CALL
    console.log(term);
  }
}

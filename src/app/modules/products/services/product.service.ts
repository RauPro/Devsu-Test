import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {IProduct} from "../models/product.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly BASE_URL = environment.baseUrl;
  private readonly PRODUCTS_ENDPOINT = `${this.BASE_URL}/bp/products`;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.PRODUCTS_ENDPOINT);
  }

  createOneProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.PRODUCTS_ENDPOINT, product);
  }

  updateOneProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.PRODUCTS_ENDPOINT}/`, product);
  }

  deleteOneProduct(id: IProduct['id']): Observable<void> {
    return this.http.delete<void>(`${this.PRODUCTS_ENDPOINT}/${id}`);
  }

  checkExistence(id: IProduct['id']): Observable<boolean> {
    return this.http.get<boolean>(`${this.PRODUCTS_ENDPOINT}/verification`, {
      params: { id: id.toString() }, // Asegurarse que id sea una cadena
    });
  }
}

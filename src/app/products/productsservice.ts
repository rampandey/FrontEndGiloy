import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../Model/Product';
import configurl from '../../assets/config/config.json'

@Injectable({
    providedIn: 'root'
  })

  export class ProductsService {

    url = configurl.apiServer.url + '/api/product/';
  constructor(private http: HttpClient) { }

  getProductList(): Observable<Products[]> {
    return this.http.get<Products[]>(this.url + 'ProductsList');
  }

  postProductData(productData: Products): Observable<Products> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
      return this.http.post<Products>(this.url + 'CreateProduct', productData, httpHeaders);
  }

  updateProductData(product: Products): Observable<Products> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
      return this.http.post<Products>(this.url + 'UpdateProduct?id=' + product.productId, product, httpHeaders);
  }

  getProductDetailsById(id: string): Observable<Products> {
    return this.http.get<Products>(this.url + 'ProductDetail?id=' + id);
  }

  deleteProductById(id: number) : Observable<number>{
        return this.http.post<number>(this.url + 'DeleteProduct?id=' + id, null);
  }

  }
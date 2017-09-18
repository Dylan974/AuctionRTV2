import { Product } from '../models/product';
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';

import { AuthService } from "./auth";

@Injectable()
export class ProductsService{
  private products: Product[] = [];

  constructor(private http: Http, private authService: AuthService) {}

  addProduct(product: Product){
    this.products.push(product);
    console.log(this.products);
  }

  addProducts(products: Product[]){
    this.products.push(...products);
  }

  getProducts(){
    return this.products;
  }

  removeProduct(index: number){
    this.products.splice(index, 1);
  }

  storeProducts(data, token){
    const userId = this.authService.getActiveUser().uid;
    console.log(data);
    return this.http.put('https://auctionrt-b09cf.firebaseio.com/' + userId + '/products.json?auth=' + token, data)
    .map((response: Response) => {
      return response.json();
    });
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://auctionrt-b09cf.firebaseio.com/' + userId + '/products.json?auth=' + token)
      .map((response: Response) => {
        return response.json();
      })
      .do((products: Product[]) => {
        if (products) {
          this.products = products;
        } else {
          this.products = [];
        }
      });
  }

}

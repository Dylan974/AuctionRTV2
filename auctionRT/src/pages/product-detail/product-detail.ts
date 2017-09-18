import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Product} from "../../models/product";
import { Categorie} from "../../models/categorie";

import { CategoriesService } from "../../services/categories";

@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage implements OnInit{

  product: Product;
  categories: Categorie[];
  categorie: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private categoriesService: CategoriesService) {
  }

  ngOnInit(){
    this.product = this.navParams.data;
    console.log(this.categoriesService.getCategories());
    console.log(this.product);
    this.categorie = this.categoriesService.getCategorieName(this.product.categorieId);
  }

}

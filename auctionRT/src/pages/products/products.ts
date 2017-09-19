import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, NavController } from 'ionic-angular';

import {ProductPage} from '../product/product';
import {EncherePage} from '../enchere/enchere';
import { ProductsService } from "../../services/products";
import { Product} from "../../models/product";
import { AuthService } from "../../services/auth";
import { ProductDetailPage } from '../product-detail/product-detail';
import { CategoriesService } from "../../services/categories";

import { Categorie } from "../../models/categorie";


@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage implements OnInit{

  constructor(private productsService: ProductsService,
              private loadingCtrl: LoadingController,
              private authService: AuthService,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              private categoriesService: CategoriesService) {}

  productPage = ProductPage;
  // detailPage = ProductDetailPage;
  products :Product[] = [];

  categories: Categorie[];


  loadProducts() {
    this.products = this.productsService.getProducts();
  }

  ngOnInit() {
    if(this.categoriesService.getCategories().length == 0) {
      console.log("test");
      this.categories = [
        new Categorie("Portable"),
        new Categorie("Téléphone"),
        new Categorie("Jeux Vidéos"),
        new Categorie("Divers")];
    }
    // this.categoriesService.removeAllCategories();
    this.categoriesService.addCategories(this.categories);
    this.loadProductsDB();
  }

  onViewDetail(product: Product) {
    this.navCtrl.push(ProductDetailPage, product);
  }

  onRemoveProduct(index: number) {
    const loading = this.loadingCtrl.create({
      content: 'Supression du produit...'
    });
    this.productsService.removeProduct(index);
    loading.present();
    this.authService.getActiveUser().getToken()
    .then(
      (token: string) => {
        this.productsService.storeProducts(this.productsService.getProducts(), token)
        .subscribe(
          () => {
            loading.dismiss();
            console.log('success');
          },
          error => {
            loading.dismiss();
            this.handleError(error.json().error);
            console.log(error);
          }
        );
      }
    );
    this.loadProducts();
  }

  onPutAuction(product: Product) {
    console.log(product);
    this.navCtrl.push(EncherePage, product);
  }

  onLogout(){
    this.authService.logout();
  }

  loadProductsDB() {
    const loading = this.loadingCtrl.create({
      content: 'chargement des produits...'
    });
    loading.present();
    this.authService.getActiveUser().getToken()
      .then(
        (token: string) => {
          this.productsService.fetchList(token)
            .subscribe(
              (list: Product[]) => {
                loading.dismiss();
                if (list) {
                  this.products = list;
                } else {
                  this.products = [];
                }
              },
              error => {
                loading.dismiss();
                this.handleError(error.json().error);
              }
            );
        }
      );
    }

    private handleError(errorMessage: string) {
      const alert = this.alertCtrl.create({
        title: 'Une erreur est survenue !',
        message: errorMessage,
        buttons: ['Ok']
      });
      alert.present();
    }

}

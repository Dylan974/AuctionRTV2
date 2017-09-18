import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Product} from "../../models/product";
import { Categorie } from "../../models/categorie";

import { ProductsService } from "../../services/products";
import { AuthService } from "../../services/auth";
import { CategoriesService } from "../../services/categories";


@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage implements OnInit{
  productForm: FormGroup;

  categories: Categorie[];

  constructor(private productsService: ProductsService,
              private navCtrl: NavController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private categoriesService: CategoriesService) {}

  ngOnInit() {
    console.log(this.categoriesService.getCategories().length == 0);
    if(this.categoriesService.getCategories().length == 0) {
      console.log("test");
      this.categories = [
        new Categorie("Portable"),
        new Categorie("Téléphone"),
        new Categorie("Jeux Vidéos"),
        new Categorie("Divers")];
    } else {
      this.categories = this.categoriesService.getCategories();
    }
    // this.categoriesService.removeAllCategories();
    this.categoriesService.addCategories(this.categories);
    console.log(this.categoriesService.getCategories());
    console.log(this.categories);
    this.initializeForm();
  }

  onSubmit() {
    const loading = this.loadingCtrl.create({
      content: 'Ajout du produit...'
    });
    console.log(this.productForm.value.category);
    let product = new Product(this.productForm.value.name, this.productForm.value.description, this.productForm.value.category);
    console.log(product);
    this.productsService.addProduct(product);
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
    this.navCtrl.pop();
  }

  private initializeForm() {
    this.productForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'category': new FormControl(1, Validators.required)
    });
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

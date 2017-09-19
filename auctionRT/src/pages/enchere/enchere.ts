import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from "../../services/auth";

import { Enchere } from '../../models/enchere';
import { EncheresService } from '../../services/encheres';
import { Product } from '../../models/product';
import { EncheresPage } from '../encheres/encheres';
// import { ProductsService } from '../../services/products';
@Component({
  selector: 'page-enchere',
  templateUrl: 'enchere.html',
})
export class EncherePage implements OnInit {
  enchere: Enchere;
  product: Product;
  statusList: string[] = ["À venir", "En cours", "En cours de paiement", "Vendu"];

  enchereForm: FormGroup;

  constructor(private navParams: NavParams,
              private authService: AuthService,
              private encheresServices: EncheresService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private navCtrl : NavController) {
  }

  ngOnInit(){
    this.product = this.navParams.data;
    this.initializeForm();
  }

  onSubmit() {
    const loading = this.loadingCtrl.create({
      content: 'Mise en enchère du produit...'
    });
    const userId = this.authService.getActiveUser().uid;
    this.enchere = new Enchere(this.enchereForm.value.status, this.enchereForm.value.price, this.enchereForm.value.decrement, this.enchereForm.value.price, this.product, userId);
    console.log(this.enchere);
    this.encheresServices.addEnchere(this.enchere);
    loading.present();
    this.authService.getActiveUser().getToken()
    .then(
      (token: string) => {
        this.encheresServices.storeEncheres(this.encheresServices.getEncheres(), token)
        .subscribe(
          () => {
            console.log('success');
          },
          error => {
            loading.dismiss();
            this.handleError(error.json().error);
            console.log(error);
          }
        );
        this.encheresServices.storeEncheresInUser(this.encheresServices.getEncheres(), token)
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
    this.navCtrl.setRoot(EncheresPage);
  }

  private initializeForm() {
    this.enchereForm = new FormGroup({
      'status': new FormControl("À venir", Validators.required),
      'price': new FormControl(null, Validators.required),
      'decrement': new FormControl(null, Validators.required),
      'min_price': new FormControl(null, Validators.required)
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

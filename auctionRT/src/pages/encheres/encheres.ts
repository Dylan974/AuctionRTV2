import { Component } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';

import { Enchere } from '../../models/enchere';
import { EncheresService } from '../../services/encheres';
import { AuthService } from "../../services/auth";

@Component({
  selector: 'page-encheres',
  templateUrl: 'encheres.html',
})
export class EncheresPage {

  encheres: Enchere[] = [];

  constructor(private encheresService: EncheresService,
              private loadingCtrl: LoadingController,
              private authService: AuthService,
              private alertCtrl: AlertController) {
  }

  loadEncheres(){
    const loading = this.loadingCtrl.create({
      content: 'chargement des enchères...'
    });
    loading.present();
    this.authService.getActiveUser().getToken()
      .then(
        (token: string) => {
          this.encheresService.fetchList(token)
            .subscribe(
              (list: Enchere[]) => {
                loading.dismiss();
                if (list) {
                  for(let i = 0; i < Object.keys(list).length; i++){
                    this.encheres.push(list[Object.keys(list)[i]]);
                  }
                  // this.encheres = list;
                } else {
                  this.encheres = [];
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

  ionViewDidLoad(){
    this.loadEncheres();
  }

  onChangeStatus(enchere: Enchere, status: string){

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

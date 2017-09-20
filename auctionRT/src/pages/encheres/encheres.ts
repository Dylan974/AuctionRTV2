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

  updateEnchere(enchere: Enchere){
    // UPDATE ENCHERE WITH FIND (ID ETC)
    let rep = this.encheres.filter((enchereEl: Enchere) => {
      return enchere.id == enchereEl.id;
    });
    console.log(rep);
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
                if (list) {
                  for(let i = 0; i < Object.keys(list).length; i++){
                    // this.encheres.push(list[Object.keys(list)[i]]);
                    let enchere = new Enchere(list[Object.keys(list)[i]].status,
                                              list[Object.keys(list)[i]].price,
                                              list[Object.keys(list)[i]].decrement,
                                              list[Object.keys(list)[i]].prix_min,
                                              list[Object.keys(list)[i]].product,
                                              list[Object.keys(list)[i]].vendeur_id,
                                              Object.keys(list)[i]);
                    this.encheres.push(enchere);
                  }
                  loading.dismiss();
                  // this.encheres = list;
                } else {
                  loading.dismiss();
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
    console.log("change : "+status);
    console.log(status == "En cours de paiement");
    if(status == "En cours de paiement"){
      const alert = this.alertCtrl.create({
        title: 'Accepter Paiement ?',
        message: "Cette action débitera votre compte !",
        buttons: [
          {
            text:"Annuler",
            role: "cancel"
          },
          {
            text:"Continuer",
            handler: data => {
              this.authService.getActiveUser().getToken()
              .then(
                (token: string) => {
                  this.encheresService.changeStatus(enchere, status, token)
                  .subscribe(
                    (enchere_rep: any) => {
                      console.log(enchere_rep)
                      if (enchere_rep) {
                        console.log("success");
                        this.updateEnchere(enchere_rep);
                      } else {
                        console.log("pas success");
                      }
                    },
                    error => {
                      this.handleError(error.json().error);
                    }
                  );
                }
              );
            }
          }
        ]
      });
      alert.present();
    }

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

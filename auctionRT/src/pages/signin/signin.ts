import { Component } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from "../../services/auth";
import { NgForm } from "@angular/forms";


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  constructor(private authService: AuthService, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {}

  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Connexion ...'
    });
    loading.present();
    this.authService.signin(form.value.email, form.value.password)
    .then(data => {
      loading.dismiss();

    })
    .catch(error => {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: "La connexion a échoué",
        message: error.message,
        buttons: ['OK']
      });
      alert.present();
    });
  }

}

import { Component } from '@angular/core';
import { AuthService } from "../../services/auth";
import { NgForm } from "@angular/forms";
import { LoadingController, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(private authService: AuthService, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {}

  onSignup(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Création du compte ..'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password)
    .then(data => {
      loading.dismiss();
    })
    .catch(error => {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: "La création du compte a échoué",
        message: error.message,
        buttons: ['OK']
      });
      alert.present();
    });
  }

}

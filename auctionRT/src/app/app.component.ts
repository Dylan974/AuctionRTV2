import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';
import { HomePage } from '../pages/home/home';
import { ProductsPage } from '../pages/products/products';
import { EncheresPage } from '../pages/encheres/encheres';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  homePage = HomePage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  productsPage = ProductsPage;
  encheresPage = EncheresPage;

  isAuthenticated = false;
  @ViewChild('nav') nav:  NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController) {
    firebase.initializeApp({
      apiKey: "AIzaSyCoumjWKmB6cRymeFLMYS3LIm03BkP3j2U",
      authDomain: "auctionrt-b09cf.firebaseapp.com",
      databaseURL: "https://auctionrt-b09cf.firebaseio.com"
    });
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.isAuthenticated = true;
        this.nav.setRoot(this.homePage);
      } else {
        this.isAuthenticated = false;
        this.nav.setRoot(this.signinPage);
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
}

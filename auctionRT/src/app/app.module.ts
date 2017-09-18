import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { ProductsPage } from '../pages/products/products';
import { ProductPage } from '../pages/product/product';
import { EncheresPage } from '../pages/encheres/encheres';
import { EncherePage } from '../pages/enchere/enchere';
import { ProductDetailPage } from '../pages/product-detail/product-detail';

import { AuthService } from "../services/auth";
import { CategoriesService } from "../services/categories";
import { ProductsService } from "../services/products";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ProductsPage,
    ProductPage,
    EncheresPage,
    ProductDetailPage,
    EncherePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    SignupPage,
    ProductsPage,
    ProductPage,
    EncheresPage,
    ProductDetailPage,
    EncherePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    CategoriesService,
    ProductsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

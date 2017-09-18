import { Component } from '@angular/core';
import { AuthService } from "../../services/auth";

import { Http } from '@angular/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private authService: AuthService, private http: Http) {}

  onTestSend() {

  }

  onLogout(){
    this.authService.logout();
  }

}

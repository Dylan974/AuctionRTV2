import { Enchere } from '../models/enchere';
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';

import firebase from 'firebase';
import { AuthService } from "./auth";

@Injectable()
export class EncheresService{
  private encheres: Enchere[] = [];

  constructor(private http: Http, private authService: AuthService) {}

  addEnchere(enchere: Enchere){
    this.encheres.push(enchere);
    console.log(this.encheres);
  }

  addEncheres(encheres: Enchere[]){
    this.encheres.push(...encheres);
  }

  getEncheres(){
    return this.encheres;
  }

  removeEnchere(index: number){
    this.encheres.splice(index, 1);
  }

  storeEncheres(data, token){
    console.log(data);
    // return this.http.put('https://auctionrt-b09cf.firebaseio.com/encheres.json?auth=' + token, data)
    // .map((response: Response) => {
    //   return response.json();
    // });
    return firebase.database().ref('encheres/').push(data).then((response: Response) => {
      return response.json();
    })
    .catch((error: Error) => {
      return error.message;
    });
  }

  storeEncheresInUser(data, token){
    const userId = this.authService.getActiveUser().uid;
    console.log(data);
    return this.http.put('https://auctionrt-b09cf.firebaseio.com/' + userId + '/encheres.json?auth=' + token, data)
    .map((response: Response) => {
      return response.json();
    });
  }

  fetchListUser(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://auctionrt-b09cf.firebaseio.com/' + userId + '/encheres.json?auth=' + token)
      .map((response: Response) => {
        return response.json();
      })
      .do((encheres: Enchere[]) => {
        if (encheres) {
          this.encheres = encheres;
        } else {
          this.encheres = [];
        }
      });
  }

  fetchList(token: string){
  //   let encheres_child : Enchere[] = [];
  //   return firebase.database().ref('encheres/').on("value", function(snapshot) {
  //     console.log(snapshot.val());
  //     return snapshot.val();
  //   }, function (errorObject) {
  //      return errorObject;
  //   }
  // );

      return this.http.get('https://auctionrt-b09cf.firebaseio.com/encheres.json?auth=' + token)
        .map((response: Response) => {
          return response.json();
        })
        .do((encheres: Enchere[]) => {
          console.log(encheres);
          if (encheres) {
            this.encheres = encheres;
          } else {
            this.encheres = [];
          }
        });
  }


}

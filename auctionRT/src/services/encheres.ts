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
    return firebase.database().ref('encheres/').push(data).then((response: Response) => {
      return response.json();
    })
    .catch((error: Error) => {
      return error.message;
    });
  }

  storeEncheresInUser(data, token){
    const userId = this.authService.getActiveUser().uid;
    return firebase.database().ref('encheres/' + userId + '/encheres.json?auth=' + token).push(data).then((response: Response) => {
      return response.json();
    })
    .catch((error: Error) => {
      return error.message;
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
    return this.http.get('https://auctionrt-b09cf.firebaseio.com/encheres.json?auth=' + token)
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

  updateEnchere(enchere, enchere_id, token){
    return this.http.put('https://auctionrt-b09cf.firebaseio.com/encheres/'+enchere_id+'.json?auth=' + token, enchere)
    .map((response: Response) => {
      return response.json();
    })
    .do((result: any) => {
      if (result) {
        console.log("result");
      } else {
        console.log("pas result");
      }
    });
  }

  changeStatus(enchere: Enchere, status: string, token:any){
    return this.http.get('https://auctionrt-b09cf.firebaseio.com/encheres/'+enchere.id+'.json?auth=' + token)
      .map((response: Response) => {
        return response.json();
      })
      .do((enchere_req: any) => {
        if (enchere_req) {
          enchere_req.status = status;
          enchere_req.id = enchere.id;
          this.updateEnchere(enchere_req, enchere.id, token)
          .subscribe(
            () => {
              console.log('success put');
            },
            error => {
              console.log(error);
            }
          );
        } else {

        }
      });
  }


}

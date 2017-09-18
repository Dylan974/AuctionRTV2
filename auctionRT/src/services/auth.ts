import firebase from 'firebase';
import { Http, Response } from '@angular/http';
import { Injectable } from "@angular/core";


@Injectable()
export class AuthService {

  constructor(private http: Http) {}

  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    firebase.auth().signOut();
  }

  getActiveUser() {
    return firebase.auth().currentUser;
  }
}

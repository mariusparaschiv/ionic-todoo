import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';


/*
  Generated class for the MyAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}
  logout() {
    this.afAuth.auth.signOut();
  }
}



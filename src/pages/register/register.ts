import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth'

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  myData = {} as User;
  passState: boolean = false;
  emailState: boolean = false;
  ionViewWillLeave() {
     this.navCtrl.getPrevious().data.myDataKey = this.myData; 
    }

  constructor(private toast: ToastController,
    private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  async register() {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
      console.log(result);
    } catch(e) {
      console.error(e);
      if(e) {
        this.toast.create( {
          message: `${e.message}`,
          duration: 3000
        }).present();
    }
  }
  this.myData.email = this.user.email;
  this.myData.password = this.user.password;
  this.navCtrl.pop();
  }

  emailCheck(emailState, email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(emailState) this.emailState = true;
    return re.test(String(email).toLowerCase());
  }

  passwordCheck(passState, password:string) {
    if(passState) this.passState = true;
    if(password != undefined) {
      if(password.length > 3 && password.length < 10){
        return true;
      }
    else {
      return false;
      }
    }
  }
}

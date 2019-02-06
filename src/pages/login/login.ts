import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  emailStatus = false;
  myData;
  emailState = false;
  passState = false;

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid) {
        this.navCtrl.push('HomePage');
      }
    });
  }

  ionViewWillEnter() { 
    this.myData = this.navParams.get('myDataKey') || null;
    if(this.myData != null) {
      this.user.email = this.myData.email;
      this.user.password = this.myData.password;
    }
 }

  constructor(private toast: ToastController,
    private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
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

  async login(user: User) {
    try{
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      if(result){
        this.navCtrl.setRoot('HomePage');
      }      
    }
    catch(e) {
      console.error(e.message);
      if(e) {
        this.toast.create( {
          message: `${e.message}`,
          duration: 3000
        }).present();
      }
    }
  }

  register() {
    console.log('register presssed');
    
    this.navCtrl.push('RegisterPage');
  }

}

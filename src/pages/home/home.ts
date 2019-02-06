import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { TodosProvider } from '../../providers/todos.service'
import { TodoItem } from '../../models/todoitem.interface';
import { AngularFireAuth } from 'angularfire2/auth'
import { AuthService } from '../../providers/myAuth.service';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  filter = {
    all: true,
    low: false,
    medium: false,
    high: false,
  }

  public items:TodoItem[] = [];

  constructor(private afAuth:AngularFireAuth, private toast: ToastController,
     public todoService: TodosProvider, private navCtrl: NavController,
     private auth: AuthService) {      
  }

  logout() {
    this.navCtrl.setRoot('LoginPage');
    this.auth.logout();
  }

  ionViewDidEnter() {
    this.getTodos();
  }
 async getTodos() {
  await this.todoService.getTodoItems();
    this.items = this.todoService.filteredItems(this.filter);  
   }
  
  goToAddTodo(): void{
    this.navCtrl.push('AddTodoPage');
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid) {
        this.toast.create( {
          message: `Welcome to Todo App ,${data.email}`,
          duration: 3000
        }).present();
      }
      else {
        this.toast.create( {
          message: `Could not found authentication details`,
          duration: 3000
        }).present();
      this.navCtrl.setRoot('LoginPage');
      }
    })
    this.getTodos();

  }

  completeTodo(event) {
    this.todoService.completeTodo(event);
  }

  deleteTodo(event) {
    this.todoService.deleteTodo(event);
    this.getTodos();
  }
  clickFilters(value) {
    switch (value) {
      case 'all': 
        this.filter.all = !this.filter.all;
        this.checkAll();
        break;
      case 'low': 
        this.filter.low = !this.filter.low;
        this.check();
        break;
      case 'medium': 
        this.filter.medium = !this.filter.medium;
        this.check();
        break;
      case 'high': 
        this.filter.high = !this.filter.high;
        this.check();
        break;
    }
  }
  checkAll() {
    if (this.filter.all === true) {
      this.filter.low = false;
      this.filter.medium = false;
      this.filter.high = false;
    }
    this.items = this.todoService.filteredItems(this.filter)
  }
  check() {
    if (this.filter.low === true || this.filter.medium === true || this.filter.high === true) {
      this.filter.all = false;
    }
    if(this.filter.low === false && this.filter.medium === false && this.filter.high === false) {
      this.filter.all = true;
    }
    this.items = this.todoService.filteredItems(this.filter)
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { TodosProvider } from '../../providers/todos.service'
import { TodoItem } from '../../models/todoitem.interface';
import { AngularFireAuth } from 'angularfire2/auth'
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
     public todoService: TodosProvider, private navCtrl: NavController) {
    this.getTodos();
  }

  getTodos() {
    this.items = this.todoService.filteredItems(this.filter);
   }
  
  goToAddTodo(): void{
    console.log('goToAddTodo pressed');
    this.navCtrl.push('AddTodoPage');
  }

  ionViewDidLoad() {
    this.todoService.getTodoItems();
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
      }
      
    })
  }

  completeTodo(event) {
    this.todoService.completeTodo(event);
  }

  deleteTodo(event) {
    this.todoService.deleteTodo(event);
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
      this.filter.low = false
      this.filter.medium = false
      this.filter.high = false
    }
    this.items = this.todoService.filteredItems(this.filter)
  }
  check() {
    if (this.filter.low === true || this.filter.medium === true || this.filter.high === true) {
      this.filter.all = false
    }
    this.items = this.todoService.filteredItems(this.filter)
  }

}

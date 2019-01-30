import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TodosProvider } from '../../providers/todos.service';

/**
 * Generated class for the EditTodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-todo',
  templateUrl: 'edit-todo.html',
})
export class EditTodoPage {
  item = null;
  

  constructor(private todoService: TodosProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditTodoPage');
  }

  completeTodo() {
    console.log(`completeTodo pressed`)
    this.todoService.completeTodo(this.item);
    this.navCtrl.pop();
  }
  saveEdits(text: string, priority: string) {
    console.log(`saveEdits pressed - ${text} - ${priority}`)
    this.todoService.editTodo(this.item);
    // this.navCtrl.setRoot('HomePage');
    this.navCtrl.pop();
  }
  cancelEdits(): void {
    // this.navCtrl.setRoot('HomePage');
    this.navCtrl.pop();
  }
  

}

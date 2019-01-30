import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TodosProvider } from '../../providers/todos.service';

/**
 * Generated class for the AddTodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-todo',
  templateUrl: 'add-todo.html',
})
export class AddTodoPage {

  textTodo: string = '';
  priority: string = 'low';

  constructor(private todoService: TodosProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTodoPage');
  }

  addTodoNext(text: string, priority: string) {
    console.log(`addTodo pressed - ${text} - ${priority}`)
    this.todoService.addTodoItem(text, priority);
  }

  checkSpace(text) {
    if (/^\s*$/.test(text)) {
      return true
    } else {
      return false
    }
  }

  addTodoExit(text: string, priority: string) {
    console.log(`addTodo pressed - ${text} - ${priority}`)
    this.todoService.addTodoItem(text, priority);
    this.navCtrl.pop();
  }
  cancelAddTodo(): void {
    this.navCtrl.pop();
  }

  checkValid() {
    let space
    let textlength
    if (/^\s*$/.test(this.textTodo)) {
      space = true
    } else {
      space = false
    }
    if (this.textTodo.length < 1) {
      textlength = true
    } else {
      textlength = false
    }
    if (space === false && textlength === false ) {
      return false
    } else {
      return true
    }
  }

}

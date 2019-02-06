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
  deadline: string = '';
  priority: string = 'low';
  textState:boolean = false;
  constructor(private todoService: TodosProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  addTodoNext(text: string, priority: string, deadline: number) {
    deadline = new Date(`${deadline}`).getTime();
    text = text.trim();
    this.todoService.addTodoItem(text, priority, deadline);
    this.navCtrl.pop();
  }

  checkSpace(textState, text) {
    if(textState) this.textState = true;
    if(this.textState && this.textTodo.length < 1) return true;
    if (!text.replace(/\s/g, '').length) return true;
    if((/^\s*$/.test(text))) return true;
    return false
  }

  cancelAddTodo(): void {
    this.navCtrl.pop();
  }

  checkValid() {
    let space;
    let textlength;
    let deadlinelength;
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
    if (this.deadline.length < 1) {
      deadlinelength = true
    } else {
      deadlinelength = false
    }
    if (space === false && textlength === false && deadlinelength === false ) {
      return false
    } else {
      return true
    }
  }

  checkDeadline(text) {
    if (text.length < 1) {
      return true
    } else {
      return false
    }
  }
}

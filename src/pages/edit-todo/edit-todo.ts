import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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

  view: boolean = true;
  textState:boolean = false;
  

  constructor(private todoService: TodosProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toast: ToastController) {
    this.item = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditTodoPage');
  }
  spaceRemover(text){
    if(text.length >= 1 && text[0] === '')
    text = '';
  }

  checkSpace(textState, text) {
    if(textState) this.textState = true;
    if(this.textState && this.item.title.length < 1) return true;
    if (!text.replace(/\s/g, '').length) return true;
    if((/^\s*$/.test(text))) return true;
    return false
  }

  completeTodo() {
    console.log(`completeTodo pressed`)
    this.todoService.completeTodo(this.item);
    this.navCtrl.pop();
  }
  saveEdits(text: string, priority: string) {
    if(text != '' && this.checkSpace(this.textState, this.item.title) == false) {
      this.item.title = text.trim();
      this.todoService.editTodo(this.item);
      this.navCtrl.pop();
    }
    else {
      this.toast.create( {
        message: `Text can not be empty`,
        duration: 3000
      }).present();
    }
    
  }
  cancelEdits(): void {
    this.navCtrl.pop();
  }
  

}

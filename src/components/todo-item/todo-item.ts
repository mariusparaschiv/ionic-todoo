import { Component,  Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the TodoItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'todo-item',
  templateUrl: 'todo-item.html'
})
export class TodoItemComponent {

  constructor(private navCtrl: NavController) {
  }

  boo: boolean = true;
  @Input() item:any;
  @Output() complete: EventEmitter <any> = new EventEmitter();
  @Output() delete: EventEmitter <any> = new EventEmitter();
  
  completeTodo(): void {
    console.log('completeTodo pressed')
    this.complete.emit(this.item);
  }
  editTodo(): void {
    console.log('editTodo pressed');
    this.navCtrl.push('EditTodoPage', {item: this.item});
  }
  deleteTodo(): void {
    console.log('deleteTodo pressed')
    this.delete.emit(this.item);
  }

}

import { Injectable } from '@angular/core';
import { TodoItem } from '../models/todoitem.interface';
import { Storage } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
// import * as moment from 'moment';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs';
/*
  Generated class for the TodosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodosProvider {

  constructor(private storage: Storage) {
  }

  TodoItems: TodoItem[] = [];
  async getTodoItems() {
  try {
  await this.storage.get('todos').then(value => {
    if(this.TodoItems === null) {
      this.TodoItems = [];
    }
      this.TodoItems = value;
    })
  } catch (error) {
    console.log(error)
    }
  }

  injectTodos(): Observable <TodoItem[]> {
    return of(this.TodoItems)
  }

  completeTodo(item: TodoItem) {
    let itemFind = this.TodoItems.find(todo => todo.id === item.id)
    let index = this.TodoItems.indexOf(itemFind)
    this.TodoItems[index].done = true
    this.storage.set('todos', this.TodoItems);
  }

  deleteTodo(item: TodoItem) {
    let itemFind = this.TodoItems.find(todo => todo.id === item.id)
    let index = this.TodoItems.indexOf(itemFind)
    this.TodoItems.splice(index, 1)
    this.storage.set('todos', this.TodoItems);
  }
  addTodoItem(todoTitle:string, todoPriority:string, deadline:number){
    const todo: TodoItem = {
      id: Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36),
      title: todoTitle,
      priority: todoPriority,
      done: false,
      time: new Date().getTime(),
      deadline: deadline

    }
        if(this.TodoItems === null) {
      this.TodoItems = [];
    }
    this.TodoItems.push(todo);
    this.storage.set('todos', this.TodoItems);

  }

  editTodo(item: TodoItem) {
    let itemFind = this.TodoItems.find(todo => todo.id === item.id)
    let index = this.TodoItems.indexOf(itemFind)
    this.TodoItems[index] = item;
    this.storage.set('todos', this.TodoItems);
  }

  filteredItems(value): Observable <TodoItem[]> {
    let filteredTodos: TodoItem[] = [];
      filteredTodos = this.TodoItems.filter(todo => {

        if (value.all === true) {
          return true
        } else if (value.high === true && todo.priority === 'high') {
          return true 
        } else if (value.medium === true && todo.priority === 'medium') {
          return true 
        } else if (value.low === true && todo.priority === 'low') {
          return true 
        }
      })
      return of(filteredTodos);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoItem } from '../models/todoitem.interface'
/*
  Generated class for the TodosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodosProvider {

  constructor(public http: HttpClient) {
  }

  TodoItems: TodoItem[] = [{
    id: '1',
    title: 'Todo A',
    priority: 'low',
    done: false
  }, {
     id: '2',
     title: 'Todo B',
     priority: 'medium',
     done: false
  }, {
      id: '3',
     title: 'Todo C',
     priority: 'high',
     done: true
  }, {
      id: '4',
     title: 'Todo D',
     priority: 'low',
     done: true
  }, {
      id: '5',
     title: 'Todo E',
     priority: 'high',
     done: false
  }];
  getTodoItems(): TodoItem[] {
    // if (localStorage.getItem('todos')) {
    //   this.TodoItems = JSON.parse(localStorage.getItem('todos'))
    // }
    return this.TodoItems;
  }

  updateItems(TodoItems: TodoItem[])  {
    this.TodoItems = TodoItems;
  }

  completeTodo(item: TodoItem) {
    let itemFind = this.TodoItems.find(todo => todo.id === item.id)
    let index = this.TodoItems.indexOf(itemFind)
    this.TodoItems[index].done = true
    console.log(this.TodoItems);
  }

  deleteTodo(item: TodoItem) {
    console.log(item)
    let itemFind = this.TodoItems.find(todo => todo.id === item.id)
    let index = this.TodoItems.indexOf(itemFind)
    this.TodoItems.splice(index, 1)
    console.log(this.TodoItems);
    // localStorage.setItem('TodoItems', JSON.stringify(this.TodoItems));
  }
  addTodoItem(todoTitle:string, todoPriority:string){
    const todo: TodoItem = {
      id: Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36),
      title: todoTitle,
      priority: todoPriority,
      done: false
    }
    this.TodoItems.push(todo);

  }

  editTodo(item: TodoItem) {
    let itemFind = this.TodoItems.find(todo => todo.id === item.id)
    let index = this.TodoItems.indexOf(itemFind)
    this.TodoItems[index] = item
  }

  filteredItems(value) {
    let filteredTodos: TodoItem[] = [] 
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
    return filteredTodos
  }


}

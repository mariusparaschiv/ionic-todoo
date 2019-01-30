import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { TodoItemComponent } from '../../components/todo-item/todo-item';

@NgModule({
  declarations: [
    HomePage,
    TodoItemComponent
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}

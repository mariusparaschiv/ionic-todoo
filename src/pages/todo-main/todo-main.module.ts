import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoMainPage } from './todo-main';

@NgModule({
  declarations: [
    TodoMainPage,
  ],
  imports: [
    IonicPageModule.forChild(TodoMainPage),
  ],
})
export class TodoMainPageModule {}

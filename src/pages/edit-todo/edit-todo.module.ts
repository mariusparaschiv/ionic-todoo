import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditTodoPage } from './edit-todo';

@NgModule({
  declarations: [
    EditTodoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditTodoPage),
  ],
})
export class EditTodoPageModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { TodoItemComponent } from './todo-item/todo-item';
import { IonicModule } from "ionic-angular";
@NgModule({
	declarations: [
    TodoItemComponent,
    ],
	imports: [IonicModule],
	exports: [
    
	TodoItemComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule {}

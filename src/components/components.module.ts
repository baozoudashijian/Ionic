import { NgModule } from '@angular/core';
import { EmojipickerComponent } from './emojipicker/emojipicker';
import { IonicPageModule } from 'ionic-angular';
import { QuestionListComponent } from './question-list/question-list';
@NgModule({
	declarations: [EmojipickerComponent,
    QuestionListComponent],
	imports: [IonicPageModule .forChild(EmojipickerComponent)],
	exports: [EmojipickerComponent,
    QuestionListComponent]
})
export class ComponentsModule {}

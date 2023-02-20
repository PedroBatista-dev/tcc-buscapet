import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { QuizGuard } from './shared/quiz.guard';

const routes: Routes = [
  { path: '', component: QuizFormComponent, canActivate: [QuizGuard],  canDeactivate: [QuizGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }

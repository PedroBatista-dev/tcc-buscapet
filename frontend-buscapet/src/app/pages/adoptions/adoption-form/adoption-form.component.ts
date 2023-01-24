import { Component, Injector } from '@angular/core';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Quiz } from '../../quiz/shared/quiz.model';
import { QuizService } from '../../quiz/shared/quiz.service';
import { UserService } from '../../users/shared/user.service';

import Swal from 'sweetalert2';
import { User } from '../../users/shared/user.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.css']
})
export class AdoptionFormComponent extends BaseResourceFormComponent<Quiz> {

  user: User = new User();

  constructor(protected quizService: QuizService, protected override injector: Injector, private userService: UserService) {
    super(injector, new Quiz(), quizService, Quiz.fromJson);
  }

  protected buildResourceForm(): void {
  }

  override loadResource(): void {
    if (this.currentAction === 'editar') {
      this.route.params.pipe(
        switchMap(params =>
          this.resourceService.getById(params['id'])
        )
      )
      .subscribe({
        next: (resource) => {
          this.resource = resource;
          this.userService.getById(this.resource.user_id!).subscribe({
            next: (resource) => {
              this.user = resource;
            },
            error: () => Swal.fire({
                  title: 'Erro!',
                  text: 'Ocorreu um erro no servidor, tente mais tarde.',
                  icon: 'error',
                  confirmButtonColor: '#44C5CD',
            })
          })
        },
        error: () => Swal.fire({
              title: 'Erro!',
              text: 'Ocorreu um erro no servidor, tente mais tarde.',
              icon: 'error',
              confirmButtonColor: '#44C5CD',
        })
      })
    }
  }
}

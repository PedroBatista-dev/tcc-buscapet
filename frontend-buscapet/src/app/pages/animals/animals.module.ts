import { NgModule } from '@angular/core';

import { AnimalsRoutingModule } from './animals-routing.module';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalFormComponent } from './animal-form/animal-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AnimalListComponent,
    AnimalFormComponent
  ],
  imports: [
    SharedModule,
    AnimalsRoutingModule
  ]
})
export class AnimalsModule { }

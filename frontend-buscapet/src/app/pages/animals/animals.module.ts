import { NgModule } from '@angular/core';

import { AnimalsRoutingModule } from './animals-routing.module';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalFormComponent } from './animal-form/animal-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AvatarAnimalComponent } from './avatar/avatar-animal.component';
import { ImageCropperModule } from 'ngx-image-cropper';



@NgModule({
  declarations: [
    AnimalListComponent,
    AnimalFormComponent,
    AvatarAnimalComponent
  ],
  imports: [
    SharedModule,
    AnimalsRoutingModule,
    ImageCropperModule
  ]
})
export class AnimalsModule { }

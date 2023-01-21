import { NgModule } from '@angular/core';

import { BreedsRoutingModule } from './breeds-routing.module';
import { BreedListComponent } from './breed-list/breed-list.component';
import { BreedFormComponent } from './breed-form/breed-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BreedListComponent,
    BreedFormComponent
  ],
  imports: [
    SharedModule,
    BreedsRoutingModule
  ]
})
export class BreedsModule { }

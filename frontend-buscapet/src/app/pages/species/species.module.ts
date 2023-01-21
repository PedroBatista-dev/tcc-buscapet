import { NgModule } from '@angular/core';

import { SpeciesRoutingModule } from './species-routing.module';
import { SpecieListComponent } from './specie-list/specie-list.component';
import { SpecieFormComponent } from './specie-form/specie-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SpecieListComponent,
    SpecieFormComponent
  ],
  imports: [
    SharedModule,
    SpeciesRoutingModule
  ]
})
export class SpeciesModule { }

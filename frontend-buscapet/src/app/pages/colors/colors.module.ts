import { NgModule } from '@angular/core';

import { ColorsRoutingModule } from './colors-routing.module';
import { ColorListComponent } from './color-list/color-list.component';
import { ColorFormComponent } from './color-form/color-form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ColorListComponent,
    ColorFormComponent
  ],
  imports: [
    SharedModule,
    ColorsRoutingModule
  ]
})
export class ColorsModule { }

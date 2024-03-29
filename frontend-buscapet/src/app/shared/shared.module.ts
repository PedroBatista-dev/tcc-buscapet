import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerErrorMessagesComponent } from './components/server-error-messages/server-error-messages.component';
import { PrimeiraLetraMaiusculaDirective } from "./directives/primeira-letra-maiuscula.directive";

import { CustomFormsModule } from 'ng2-validation';
import { NgBrazil } from 'ng-brazil';

import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {  NgChartsModule  } from 'ng2-charts';


@NgModule({
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
    PrimeiraLetraMaiusculaDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CustomFormsModule,
    NgBrazil,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbTooltipModule,
    NgChartsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbTooltipModule,
    PrimeiraLetraMaiusculaDirective,
    NgChartsModule
  ]
})
export class SharedModule { }

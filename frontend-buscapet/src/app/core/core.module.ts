import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from '../in-memory-database';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase)
  ],
  exports: [
    BrowserModule,
    HttpClientModule
  ]
})
export class CoreModule { }

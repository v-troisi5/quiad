import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BearerInterceptor } from '../interceptors/bearer.interceptor';
import { TreeService } from './services/tree.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    TreeService
  ]
})
export class TreeModule { }

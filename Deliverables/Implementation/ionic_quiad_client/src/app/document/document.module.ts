import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHttpCachingModule, NgHttpCachingConfig, NgHttpCachingStrategy } from 'ng-http-caching';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgHttpCachingModule.forRoot({
      lifetime: 1000 * 60 * 60, // cache expire after 60 minutes,
      allowedMethod: ['GET', 'HEAD'],
      // cacheStrategy: NgHttpCachingStrategy.ALLOW_ALL,
      isCacheable: (req) => {
        console.log(req.url)
        return req.url.includes("documents");
      }
    })
  ]
})
export class DocumentModule { }

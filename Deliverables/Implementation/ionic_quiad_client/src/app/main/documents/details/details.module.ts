import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BindDocumentComponent } from '../components/bind-document/bind-document.component';
import { TreeModule } from 'src/app/tree/tree.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    PdfViewerModule,
    TreeModule
  ],
  declarations: [DetailsPage, BindDocumentComponent]
})
export class DetailsPageModule {}

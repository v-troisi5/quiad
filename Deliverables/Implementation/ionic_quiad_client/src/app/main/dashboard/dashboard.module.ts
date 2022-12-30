import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { TreeModule } from 'src/app/tree/tree.module';
import { NodeComponent } from './components/node/node.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    TreeModule
  ],
  declarations: [
    DashboardPage,
    NodeComponent
  ],
  providers: []
})
export class DashboardPageModule {}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DocumentService } from 'src/app/document/services/document.service';
import { BindDocumentComponent } from '../components/bind-document/bind-document.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  private id?: number;

  constructor(
    private activateRoute: ActivatedRoute,
    private modalController: ModalController
  ) {

  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.id = parseInt(params["id"]);
    });
  }

  public presentBindDocumentModal() {
    this.modalController
      .create({
        component: BindDocumentComponent,
        componentProps: {
          document: this.id
        }
      }).then(modal => {
        modal.present();
      })
  }

}

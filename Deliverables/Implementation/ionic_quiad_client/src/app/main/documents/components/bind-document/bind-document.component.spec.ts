import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TreeService } from 'src/app/tree/services/tree.service';
import { TreeModule } from 'src/app/tree/tree.module';

import { BindDocumentComponent } from './bind-document.component';

describe('BindDocumentComponent', () => {
  let component: BindDocumentComponent;
  let fixture: ComponentFixture<BindDocumentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BindDocumentComponent ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        TreeModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BindDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

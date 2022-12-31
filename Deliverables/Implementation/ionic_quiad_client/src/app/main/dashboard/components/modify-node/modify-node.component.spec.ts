import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TreeModule } from 'src/app/tree/tree.module';

import { ModifyNodeComponent } from './modify-node.component';

describe('ModifyNodeComponent', () => {
  let component: ModifyNodeComponent;
  let fixture: ComponentFixture<ModifyNodeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyNodeComponent ],
      imports: [
        IonicModule.forRoot(),
        TreeModule,
        HttpClientTestingModule,
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

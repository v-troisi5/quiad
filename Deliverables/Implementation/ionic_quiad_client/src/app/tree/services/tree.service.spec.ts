import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TreeModule } from '../tree.module';

import { TreeService } from './tree.service';

describe('TreeService', () => {
  let service: TreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TreeModule
      ]
    });
    service = TestBed.inject(TreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});

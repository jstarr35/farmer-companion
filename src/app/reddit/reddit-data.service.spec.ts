/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RedditDataService } from './reddit-data.service';

describe('Service: RedditData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedditDataService]
    });
  });

  it('should ...', inject([RedditDataService], (service: RedditDataService) => {
    expect(service).toBeTruthy();
  }));


});

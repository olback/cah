import { TestBed, inject } from '@angular/core/testing';

import { UsernameService } from './username.service';
import { SocketIoModule } from 'ngx-socket-io';
import { environment as env } from '../../environments/environment';

describe('UsernameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsernameService],
      imports: [SocketIoModule.forRoot(env.sioc)]
    });
  });

  it('should be created', inject([UsernameService], (service: UsernameService) => {
    expect(service).toBeTruthy();
  }));
});

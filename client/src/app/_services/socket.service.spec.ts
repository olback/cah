import { TestBed, inject } from '@angular/core/testing';

import { SocketService } from './socket.service';
import { SocketIoModule } from 'ngx-socket-io';
import { environment as env } from 'environments/environment';

describe('SocketService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketService],
      imports: [SocketIoModule.forRoot(env.sioc)]
    });
  });

  it('should be created', inject([SocketService], (service: SocketService) => {
    expect(service).toBeTruthy();
  }));
});

import { SocketIoConfig } from 'ngx-socket-io';

const sioc: SocketIoConfig = {
  url: origin,
  options: {}
};

export const environment = {
  production: true,
  sioc: sioc
};

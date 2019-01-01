import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

// Services
import { SocketService } from './_services/socket.service';

// Other imports
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment as env } from '../environments/environment';
import { MainComponent } from './main/main.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { GameComponent } from './game/game.component';

const sioc: SocketIoConfig = {
  url: env.siou,
  options: {}
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CreateGameComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(sioc)
  ],
  providers: [
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

// Services
import { SocketService } from './_services/socket.service';
import { UsernameService } from './_services/username.service';

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
    FormsModule,
    SocketIoModule.forRoot(sioc)
  ],
  providers: [
    SocketService,
    UsernameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

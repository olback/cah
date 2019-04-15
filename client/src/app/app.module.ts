import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { GameComponent } from './game/game.component';

// Services
import { SocketService } from './_services/socket.service';
import { UsernameService } from './_services/username.service';
import { TokenService } from './_services/token.service';

// Other imports
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment as env } from '../environments/environment';
import { ClipboardModule } from 'ngx-clipboard';
import { InGameSettingsComponent } from './in-game-settings/in-game-settings.component';

const sioc: SocketIoConfig = {
  url: env.siou,
  options: {}
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CreateGameComponent,
    GameComponent,
    InGameSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(sioc),
    ClipboardModule
  ],
  providers: [
    SocketService,
    UsernameService,
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

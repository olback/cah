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
import { InGameSettingsComponent } from './in-game-settings/in-game-settings.component';
import { SettingsComponent } from './settings/settings.component';
import { ToastComponent } from './toast/toast.component';

// Services
import { SocketService } from './_services/socket.service';
import { UsernameService } from './_services/username.service';
import { TokenService } from './_services/token.service';
import { ToastService } from './_services/toast.service';

// Modules
import { ClipboardModule } from 'ngx-clipboard';
import { FAModule } from './fa/fa.module';

// Other imports
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment as env } from '../environments/environment';
import { InfoComponent } from './info/info.component';
import { BlankCardModalComponent } from './blank-card-modal/blank-card-modal.component';

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
    InGameSettingsComponent,
    SettingsComponent,
    ToastComponent,
    InfoComponent,
    BlankCardModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(sioc),
    ClipboardModule,
    FAModule
  ],
  providers: [
    SocketService,
    UsernameService,
    TokenService,
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

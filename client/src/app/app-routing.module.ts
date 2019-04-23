import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { GameComponent } from './game/game.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'game/:id',
    component: GameComponent
  },
  {
    path: 'join/:id',
    component: MainComponent
  },
  {
    path: 'create',
    component: CreateGameComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

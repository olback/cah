import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { GameComponent } from './game/game.component';
import { CreateGameComponent } from './create-game/create-game.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: 'create',
    component: CreateGameComponent
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

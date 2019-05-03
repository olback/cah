import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { TokenService } from '../_services/token.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  modals = {
    settings: false,
    blank: false
  };
  gid = '';
  pid = this._token.get();
  game: ISocket.GameState.State;
  message = '';
  selectedWhite: WhiteCard | null = null;
  winnerCard: PlayedCards;
  done = true;
  gameOver = false;

  constructor(
    private _route: ActivatedRoute,
    private _socket: Socket,
    private _token: TokenService
  ) {

    this._socket.on('game', (game: ISocket.GameState.State) => {
      this.game = game;

      if (this.game.players.length < 3) {
        this.message = 'Waiting for players';
      } else if (game.czar === this._token.get()) {
        this.message = 'You are the card czar';
      } else {
        this.message = '';
      }

      for (const p of game.playedCards) {
        if (p.pid === this._token.get()) {
          this.done = true;
          break;
        }
      }

      for (const p of game.players) {
        if (p.score === this.game.winAt) {
          this.message = `${p.username} won the game!`;
          this.gameOver = true;
        }
      }

    });

    this._socket.on('round-winner', (winner: { pid: string }) => {
      for (const p of this.game.players) {
        if (p.id === winner.pid) {
          this.message = `${p.username} won this round!`;
        }
      }
      for (const cards of this.game.playedCards) {
        if (cards.pid === winner.pid) {
          cards.winner = true;
        }
      }
    });

  }

  ngOnInit() {
    this._route.params.forEach(v => {
      this.gid = v.id;
    });

    this._socket.emit('game', { pid: this._token.get(), gid: this.gid });
  }

  ngOnDestroy() {
    this._socket.emit('leave-game', {
      pid: this._token.get(),
      gid: this.gid
    });
  }

  confirm() {

    if (this.game.czar === this.pid) {

      this._socket.emit('pick-winner', {
        pid: this._token.get(),
        gid: this.gid,
        winner: this.winnerCard.pid
      });

      this.winnerCard = null;

    } else {

      this._socket.emit('pick-white', {
        pid: this._token.get(),
        gid: this.gid,
        card: this.selectedWhite
      });

      this.selectedWhite = null;

    }

  }

  selectWhite(card: WhiteCard) {
    this.done = false;
    for (const p of this.game.playedCards) {
      if (p.pid === this._token.get()) {
        this.done = true;
        return;
      }
    }
    this.selectedWhite = card;
  }

  selectWinner(winner: PlayedCards) {
    if (this.game.czar === this._token.get()) {
      this.winnerCard = winner;
    }
  }

  sync() {
    this._socket.emit('game', {
      pid: this._token.get(),
      gid: this.gid
    });
  }

  playBlank(text: string) {
    this.modals.blank = false;
    this._socket.emit('blank-card', {
      pid: this._token.get(),
      gid: this.gid,
      text: text
    });
  }

}

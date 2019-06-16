import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { TokenService } from '@service/token.service';
import { ToastService } from '@service/toast.service';
import { Toast } from '@class/toast';
import { GameRequest } from '@class/game-request';
import { Winner } from '@class/winner';
import { PickedWhite } from '@class/picked-white';
import { BlankCard } from '@class/blank-card';
import { SettingsService } from '@service/settings.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  @ViewChild('myCardsRef', { static: false }) myCardsRef: ElementRef;
  @ViewChild('playedCardsRef', { static: false }) playedCardsRef: ElementRef;

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

  constructor(
    private _route: ActivatedRoute,
    private _socket: Socket,
    private _token: TokenService,
    private _toastService: ToastService,
    private _settingsService: SettingsService
  ) {

    this._socket.on('game', (game: ISocket.GameState.State) => {
      this.game = game;

      if (this.game.players.length < 3) {
        this.message = 'Waiting for players';
        this.done = true;
      } else if (game.czar === this._token.get()) {
        this.message = 'You are the card czar';
      } else {
        this.message = '';
        this.done = false;
      }

      for (const p of game.playedCards) {
        if (p.pid === this._token.get()) {
          this.done = true;
          break;
        } else {
          this.done = false;
        }
      }

      for (const p of game.players) {
        if (p.score === this.game.settings.maxScore) {
          this.message = `${p.username} won the game!`;
          this.done = true;
        }
      }

    });

    this._socket.on('round-winner', (winner: { pid: string, score: number }) => {

      for (const p of this.game.players) {
        if (p.id === winner.pid) {
          this.message = `${p.id === this.pid ? 'You' : p.username } won this round!`;
          p.score = winner.score;
          break;
        }
      }

      for (const cards of this.game.playedCards) {
        if (cards.pid === winner.pid) {
          cards.winner = true;
          break;
        }
      }

    });

  }

  ngOnInit() {

    this._route.params.forEach(v => {
      this.gid = v.id;
    });

    const gr = new GameRequest(this._token.get(), this.gid);
    this._socket.emit('game', gr);

  }

  ngOnDestroy() {

    const gr = new GameRequest(this._token.get(), this.gid);
    this._socket.emit('leave-game', gr);

  }

  confirm() {

    if (this.game.czar === this.pid) {

      const winner = new Winner(this._token.get(), this.gid, this.winnerCard.pid);
      this._socket.emit('pick-winner', winner);

      this.winnerCard = null;

    } else {

      const white = new PickedWhite(this._token.get(), this.gid, this.selectedWhite);
      this._socket.emit('pick-white', white);

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
    this.done = false;
    if (this.game.czar === this._token.get()) {
      this.winnerCard = winner;
    }
  }

  sync() {
    const gr = new GameRequest(this._token.get(), this.gid);
    this._socket.emit('game', gr);
    this._toastService.emit(new Toast('Game synced.', 3000));
  }

  playBlank(text: string) {
    this.modals.blank = false;
    const blank = new BlankCard(this._token.get(), this.gid, text);
    this._socket.emit('blank-card', blank);
  }

  scrollX(e: WheelEvent, selector: string) {
    const scrollFactor = this._settingsService.settings.scrollFactor.get() as number;
    // @ts-ignore
    this[selector].nativeElement.scrollBy(e.deltaY * scrollFactor, 0);
  }

}

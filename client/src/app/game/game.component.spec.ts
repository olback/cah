import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InGameSettingsComponent } from 'app/in-game-settings/in-game-settings.component';
import { BlankCardModalComponent } from 'app/blank-card-modal/blank-card-modal.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SocketIoModule } from 'ngx-socket-io';
import { environment as env } from 'environments/environment';

describe('GameComponent', () => {
    let component: GameComponent;
    let fixture: ComponentFixture<GameComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                GameComponent,
                InGameSettingsComponent,
                BlankCardModalComponent
            ],
            imports: [
                FontAwesomeModule,
                FormsModule,
                RouterModule.forRoot([]),
                SocketIoModule.forRoot(env.sioc)
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

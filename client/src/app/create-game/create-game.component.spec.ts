import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGameComponent } from './create-game.component';
import { FormsModule } from '@angular/forms';
import { SocketIoModule } from 'ngx-socket-io';
import { environment as env } from 'environments/environment';
import { ClipboardModule } from 'ngx-clipboard';
import { RouterModule } from '@angular/router';

describe('CreateGameComponent', () => {
    let component: CreateGameComponent;
    let fixture: ComponentFixture<CreateGameComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateGameComponent],
            imports: [
                FormsModule,
                SocketIoModule.forRoot(env.sioc),
                ClipboardModule,
                RouterModule.forRoot([])
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateGameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

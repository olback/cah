import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InGameSettingsComponent } from './in-game-settings.component';
import { ClipboardModule } from 'ngx-clipboard';
import { SocketIoModule } from 'ngx-socket-io';
import { environment as env } from 'environments/environment';

describe('InGameSettingsComponent', () => {
    let component: InGameSettingsComponent;
    let fixture: ComponentFixture<InGameSettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InGameSettingsComponent],
            imports: [
                ClipboardModule,
                SocketIoModule.forRoot(env.sioc)
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InGameSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

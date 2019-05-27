import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoComponent } from './info.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SocketIoModule } from 'ngx-socket-io';
import { environment as env} from 'environments/environment';

describe('InfoComponent', () => {
    let component: InfoComponent;
    let fixture: ComponentFixture<InfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InfoComponent],
            imports: [
                FontAwesomeModule,
                SocketIoModule.forRoot(env.sioc)
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankCardModalComponent } from './blank-card-modal.component';
import { FormsModule } from '@angular/forms';

describe('BlankCardModalComponent', () => {
    let component: BlankCardModalComponent;
    let fixture: ComponentFixture<BlankCardModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BlankCardModalComponent],
            imports: [FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BlankCardModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

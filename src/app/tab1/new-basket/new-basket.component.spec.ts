import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewBasketComponent } from './new-basket.component';

describe('NewBasketComponent', () => {
  let component: NewBasketComponent;
  let fixture: ComponentFixture<NewBasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBasketComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

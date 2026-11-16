import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarVueloDialog } from './editar-vuelo-dialog';

describe('EditarVueloDialog', () => {
  let component: EditarVueloDialog;
  let fixture: ComponentFixture<EditarVueloDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarVueloDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarVueloDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

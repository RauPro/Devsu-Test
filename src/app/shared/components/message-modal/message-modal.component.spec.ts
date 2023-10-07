import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageModalComponent } from './message-modal.component';

describe('MessageModalComponent', () => {
  let component: MessageModalComponent;
  let fixture: ComponentFixture<MessageModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageModalComponent]
    });
    fixture = TestBed.createComponent(MessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should emit cancel event when cancel button is clicked', () => {
    spyOn(component.cancel, 'emit');

    const cancelButton = fixture.debugElement.nativeElement.querySelector('.close_btn');
    cancelButton.click();

    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should emit confirm event when confirm button is clicked', () => {
    spyOn(component.confirm, 'emit');

    const confirmButton = fixture.debugElement.nativeElement.querySelector('.accept_btn');
    confirmButton.click();

    expect(component.confirm).toHaveBeenCalled();
  });
  it('should emit cancel event when onCancel() is called', () => {
    let emitted = false;
    component.cancel.subscribe(() => emitted = true);

    component.onCancel();

    expect(emitted).toBe(true);
  });

  it('should emit confirm event when onConfirm() is called', () => {
    let emitted = false;
    component.confirm.subscribe(() => emitted = true);

    component.onConfirm();

    expect(emitted).toBe(true);
  });

  it('should emit cancel event when onBackgroundClick() is called', () => {
    let emitted = false;
    component.cancel.subscribe(() => emitted = true);

    component.onBackgroundClick();

    expect(emitted).toBe(true);
  });
});

import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() showCancel: boolean = true;
  @Input() showConfirm: boolean = true;

  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() confirm: EventEmitter<void> = new EventEmitter();

  onCancel() {
    this.cancel.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }

  onBackgroundClick() {
    this.cancel.emit();
  }
}

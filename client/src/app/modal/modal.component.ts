import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() showModal: boolean = true;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  closeModal() {
    this.showModal = false;
    this.closeModalEvent.emit(false);
  }
}

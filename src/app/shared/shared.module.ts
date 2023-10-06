import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponent} from "./components/layout/layout.component";
import {MessageModalComponent} from "./components/message-modal/message-modal.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [LayoutComponent, MessageModalComponent],
  imports: [CommonModule, RouterModule],
  exports: [MessageModalComponent, LayoutComponent]
})
export class SharedModule {}

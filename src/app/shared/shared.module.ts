import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponent} from "./components/layout/layout.component";
import {MessageModalComponent} from "./components/message-modal/message-modal.component";
import {RouterModule} from "@angular/router";
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [LayoutComponent, MessageModalComponent, LoaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [MessageModalComponent, LayoutComponent, LoaderComponent]
})
export class SharedModule {}

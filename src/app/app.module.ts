import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { MessageModalComponent } from './shared/components/message-modal/message-modal.component';
import {SharedModule} from "./shared/shared.module";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";

@NgModule({
    declarations: [
        AppComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
      SharedModule
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
    bootstrap: [AppComponent]
})
export class AppModule { }

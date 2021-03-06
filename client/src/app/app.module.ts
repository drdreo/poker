import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import * as Sentry from '@sentry/angular';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorService } from './error.service';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { TableModule } from './table/table.module';

const config: SocketIoConfig = { url: environment.socket_url, options: {} };


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        SocketIoModule.forRoot(config),
        TableModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorService, multi: true },
        {
            provide: ErrorHandler,
            useValue: Sentry.createErrorHandler({
                showDialog: false
            })
        },
        {
            provide: Sentry.TraceService,
            deps: [Router]
        },
        {
            provide: APP_INITIALIZER,
            useFactory: () => () => {},
            deps: [Sentry.TraceService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

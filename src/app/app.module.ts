import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextMaskModule } from 'angular2-text-mask';
import { CustomDatetimepickerModule } from './components/custom-datetimepicker/custom-datetimepicker.module';
import { LoadingModule } from './components/loading/loading.module';
import { ModalConfirmacaoModule } from './components/modal-confirmacao/modal-confirmacao.module';
import { NotificationModule } from './components/notification/notification.module';
import { HttpLoadingInterceptor } from 'src/services/interceptors/httpLoadingInterceptor';
import { HttpErrorHandleInterceptor } from 'src/services/interceptors/httpErrorHandlerInterceptor';
import { ModalLoginModule } from './components/modal-login/modal-login.module';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        LoadingModule,
        NotificationModule,
        CustomDatetimepickerModule,
        ModalConfirmacaoModule,
        ModalLoginModule,
        TextMaskModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandleInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' },
        },
    ],
    entryComponents: [ModalLoginComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

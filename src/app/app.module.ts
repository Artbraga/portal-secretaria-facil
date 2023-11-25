import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextMaskModule } from 'angular2-text-mask';
import { CustomDatetimepickerModule } from './components/custom-datetimepicker/custom-datetimepicker.module';
import { LoadingModule } from './components/loading/loading.module';
import { ModalConfirmacaoModule } from './components/modal-confirmacao/modal-confirmacao.module';
import { NotificationModule } from './components/notification/notification.module';
import { HttpLoadingInterceptor } from 'src/services/interceptors/httpLoadingInterceptor';
import { HttpErrorHandleInterceptor } from 'src/services/interceptors/httpErrorHandlerInterceptor';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthInterceptor } from 'src/services/interceptors/httpAuthenticationInterceptor';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CountdownModule } from 'ngx-countdown';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSelectModule } from './components/custom-select/custom-select.module';
import { TabelaTurmaComponent } from './views/tabela-turma/tabela-turma.component';
import { MatCardModule } from '@angular/material/card';
import { CustomTableModule } from './components/custom-table/custom-table.module';
import { SharedModule } from './components/shared/shared.module';
import { FichaTurmaComponent } from './views/ficha-turma/ficha-turma.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RegistroTurmaComponent } from './components/registro-turma/registro-turma.component';
import { AdicionarNotaComponent } from './views/notas-turma/adicionar-nota/adicionar-nota.component';
import { NotasTurmaComponent } from './views/notas-turma/notas-turma.component';
import { FichaAlunoComponent } from './views/ficha-aluno/ficha-aluno.component';
import { RegistroAlunoComponent } from './views/ficha-aluno/registro-aluno/registro-aluno.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        TabelaTurmaComponent,
        FichaTurmaComponent,
        RegistroTurmaComponent,
        AdicionarNotaComponent,
        NotasTurmaComponent,
        FichaAlunoComponent,
        RegistroAlunoComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatTabsModule,
        MatTooltipModule,
        MatSidenavModule,
        MatCardModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        LoadingModule,
        NotificationModule,
        CustomDatetimepickerModule,
        CustomSelectModule,
        CustomTableModule,
        ModalConfirmacaoModule,
        TextMaskModule,
        CountdownModule,
        SharedModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandleInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' },
        },
    ],
    entryComponents: [
        AdicionarNotaComponent,
        RegistroTurmaComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

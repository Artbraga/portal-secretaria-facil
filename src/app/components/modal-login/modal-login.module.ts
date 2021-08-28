import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalLoginComponent } from './modal-login.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [ModalLoginComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule
    ],
    exports: [ModalLoginComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class ModalLoginModule { }

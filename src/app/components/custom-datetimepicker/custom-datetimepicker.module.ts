import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatetimepickerComponent } from './custom-datetimepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_FORMATS, NativeDateAdapter, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

const CUSTOM_FORMAT = MAT_MOMENT_DATE_FORMATS;
CUSTOM_FORMAT.parse.dateInput = 'L';
CUSTOM_FORMAT.display.dateInput = 'L';

@NgModule({
    declarations: [CustomDatetimepickerComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatMomentDateModule,
        FormsModule,
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: CUSTOM_FORMAT },
    ],
    exports: [
        CustomDatetimepickerComponent
    ]
})
export class CustomDatetimepickerModule { }

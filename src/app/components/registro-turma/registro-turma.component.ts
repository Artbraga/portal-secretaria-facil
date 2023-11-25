import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RegistroTurma } from "src/app/model/registro-turma.model";
import { Turma } from "src/app/model/turma.model";
import { BaseFormularioComponent } from "../base-formulario.component";
import { NotificationService } from "../notification/notification.service";
import { NotificationType } from "../notification/toaster/toaster";

@Component({
    selector: "registro-turma",
    templateUrl: "./registro-turma.component.html",
    styleUrls: ["./registro-turma.component.scss"],
})
export class RegistroTurmaComponent extends BaseFormularioComponent<RegistroTurma> implements OnInit {

    constructor(private notificationService: NotificationService,
                private dialogRef: MatDialogRef<RegistroTurmaComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Turma) {
        super(new RegistroTurma());
        this.element.data = new Date();
    }

    ngOnInit(): void {}

    closeModal(salvar: boolean) {
        if (salvar) {
            if (this.validar()) {
                this.element.turmaId = this.data.id;
                this.dialogRef.close(this.element);
            }
            else {
                this.notificationService.addNotification('Erro!', 'Registro de turma não pode ser salvo vazio.', NotificationType.Error)
            }
        }
        else {
            this.dialogRef.close(null);
        }
    }

    validar(): boolean {
        return this.stringValida(this.element.registro);
    }
}

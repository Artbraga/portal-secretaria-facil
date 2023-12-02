import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseFormularioComponent } from 'src/app/components/base-formulario.component';
import { ModalConfirmacaoComponent } from 'src/app/components/modal-confirmacao/modal-confirmacao.component';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { NotificationType } from 'src/app/components/notification/toaster/toaster';
import { AlteraSenha } from 'src/app/model/altera-senha.model';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'altera-senha',
  templateUrl: './altera-senha.component.html',
  styleUrls: ['./altera-senha.component.scss'],
})
export class AlteraSenhaComponent extends BaseFormularioComponent<AlteraSenha> implements OnInit {
  
  get login() {
    return this.usuarioService.loginUsuario;
  }

  constructor(private usuarioService: UsuarioService, 
    private notificationService: NotificationService,
    public dialog: MatDialog) {
    super(new AlteraSenha());
  }

  ngOnInit(): void {
    this.element.usuarioId = parseInt(this.usuarioService.idUsuario);
  }

  public salvar() {
    if (this.validar()) {
      const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
        data: { mensagem: `Deseja alterar a senha?` }
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.usuarioService.alterarSenha(this.element).subscribe(x => {
            this.notificationService.addNotification('Sucesso!', 'Senha alterada com sucesso!', NotificationType.Success)
            this.element = new AlteraSenha();
          })
        }
      });
    }
  }

  validar(): boolean {
    let valido = true;
    if (!this.stringValida(this.element.senhaAntiga)) {
      this.notificationService.addNotification('Erro!', 'Digite a senha atual.', NotificationType.Error)
      valido = false;
    }
    if (!this.stringValida(this.element.senhaNova)) {
      this.notificationService.addNotification('Erro!', 'Digite a nova senha.', NotificationType.Error)
      valido = false;
    } 
    else if (this.element.senhaNova.length < 6) {
      this.notificationService.addNotification('Erro!', 'Sua senha precisa ter ao menos 6 dígitos.', NotificationType.Error);
      valido = false;
    } 
    return valido;
  }
}

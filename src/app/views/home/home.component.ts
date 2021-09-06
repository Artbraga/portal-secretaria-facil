import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private usuarioService: UsuarioService) { }

    ngOnInit(): void {
        console.log(this.usuarioService.perfilUsuario);
        console.log(this.usuarioService.permissoesUsuario);
    }

}
